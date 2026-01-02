import Doctor from "../model/doctor.model.js";
import bcrypt from "bcrypt";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import jwt from "jsonwebtoken";

// Simple regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//adding doctor by admin
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      hospital,
      experience,
    } = req.body;
    const imageFile = req.file || req.files?.[0];

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

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor already exists with this email" });
    }

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, "doctors");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      hospital,
      experience,
      image: imageUrl,
    });

    await doctor.save();

    return res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        experience: doctor.experience,
        image: doctor.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in adding doctor controller",
      error: error.message,
    });
  }
};

//admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in admin login controller",
      error: error.message,
    });
  }
};

//view the list of doctors available
const viewDoctorList = async (req, res) => {
  try {
    const { specialization, hospital } = req.query;
    const filter = {};
    if (specialization) filter.specialization = specialization;
    if (hospital) filter.hospital = hospital;

    const doctors = await Doctor.find(filter).select("-password"); // exclude password

    if (!doctors || doctors.length === 0)
      return res.status(404).json({ message: "No doctors found" });

    return res.status(200).json({
      message: "Doctors retrieved successfully",
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in fetching doctor list", error: error.message });
  }
};
export { addDoctor, adminLogin, viewDoctorList };
