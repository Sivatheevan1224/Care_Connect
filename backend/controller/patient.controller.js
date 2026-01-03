import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Patient from "../model/patient.model.js";
import Doctor from "../model/doctor.model.js";
import Appointment from "../model/appointments.model.js";

//register a patient
const registerPatient = async (req, res) => {
  try {
    const { name, email, password, phone, dateOfBirth, gender, address } = req.body;

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
      phone,
      dateOfBirth,
      gender,
      address,
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

//login a patient
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

//get the profile information
const getProfile = async (req, res) => {
  try {
    const patientId = req.patient?.id;

    if (!patientId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No patient ID found" });
    }
    const patient = await Patient.findById(patientId).select("-password");

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    return res
      .status(200)
      .json({ message: "Profile retrieved successfully", patient });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching patient profile",
      error: error.message,
    });
  }
};

//update the profile information
const updateProfile = async (req, res) => {
  try {
    const patientId = req.patient?.id;
    if (!patientId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No patient ID found" });
    }

    const { name, email, phone, address, dateOfBirth, gender } = req.body;

    // Check if email is being changed and if it's already in use
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const existingPatient = await Patient.findOne({
        email,
        _id: { $ne: patientId },
      });

      if (existingPatient) {
        return res
          .status(400)
          .json({ message: "Email already in use by another account" });
      }
    }

    // Build update object with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in updating patient profile",
      error: error.message,
    });
  }
};

// book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, timeSlot, reason } = req.body;

    console.log("Booking appointment with data:", {
      patientId,
      doctorId,
      date,
      timeSlot,
      reason,
    });

    if (!patientId || !doctorId || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "Patient, doctor, date, and timeSlot are required" });
    }

    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient) {
      console.log("Patient not found:", patientId);
      return res.status(404).json({ message: "Patient not found" });
    }
    if (!doctor) {
      console.log("Doctor not found:", doctorId);
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
    });

    if (existingAppointment) {
      console.log("Time slot already booked:", { doctorId, date, timeSlot });
      return res
        .status(400)
        .json({ message: "Doctor is already booked for this time slot" });
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot,
      reason,
      status: "Pending",
    });

    const savedAppointment = await appointment.save();
    console.log("Appointment saved successfully:", savedAppointment._id);

    return res
      .status(201)
      .json({
        message: "Appointment booked successfully",
        appointment: savedAppointment,
      });
  } catch (error) {
    console.error("Error in booking appointment:", error);
    return res
      .status(500)
      .json({ message: "Error in booking appointment", error: error.message });
  }
};

//get the list of appointments
const getAppointments = async (req, res) => {
  try {
    const patientId = req.patient?.id;
    if (!patientId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No patient ID found" });
    }

    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "name email specialization hospital image")
      .sort({ date: -1 });

    return res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in fetching appointments",
      error: error.message,
    });
  }
};

//cancel the appointment
const cancelAppointment = async (req, res) => {
  try {
    const patientId = req.patient?.id;
    const { appointmentId } = req.params;

    if (!patientId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No patient ID found" });
    }

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if the appointment belongs to the patient
    if (appointment.patient.toString() !== patientId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this appointment" });
    }

    // Check if appointment is already cancelled
    if (appointment.status === "Cancelled") {
      return res
        .status(400)
        .json({ message: "Appointment is already cancelled" });
    }

    // Check if appointment is already completed
    if (appointment.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Cannot cancel a completed appointment" });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    return res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in cancelling appointment",
      error: error.message,
    });
  }
};

export {
  registerPatient,
  loginPatient,
  getProfile,
  updateProfile,
  bookAppointment,
  getAppointments,
  cancelAppointment,
};
