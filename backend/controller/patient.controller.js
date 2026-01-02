import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../model/patient.model.js";

const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res
        .status(400)
        .json({ message: "Patient already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const patient = new Patient({
      name,
      email,
      password: hashedPassword,
    });

    await patient.save();

    const token = jwt.sign(
      { id: patient._id, role: "patient", email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Patient registered successfully",
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in patient registration",
      error: error.message,
    });
  }
};

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: patient._id, role: "patient", email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      patient: { id: patient._id, name: patient.name, email: patient.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in patient login", error: error.message });
  }
};
export { registerPatient, loginPatient };
