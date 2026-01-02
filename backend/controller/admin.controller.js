import Doctor from "../model/doctor.model.js";
import Patient from "../model/patient.model.js";
import Appointment from "../model/appointments.model.js";
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
      phone,
      specialization,
      hospital,
      experience,
    } = req.body;
    const imageFile = req.file || req.files?.[0];

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Name and email are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
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

    const doctor = new Doctor({
      name,
      email,
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

//update doctor details
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      phone,
      specialization,
      hospital,
      experience,
      status,
    } = req.body;

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update fields
    if (name) doctor.name = name;
    if (email) doctor.email = email;
    if (phone) doctor.phone = phone;
    if (specialization) doctor.specialization = specialization;
    if (hospital) doctor.hospital = hospital;
    if (experience) doctor.experience = experience;
    if (status) doctor.status = status;

    // Update password if provided
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(password, salt);
    }

    await doctor.save();

    return res.status(200).json({
      message: "Doctor updated successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        experience: doctor.experience,
        status: doctor.status,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating doctor",
      error: error.message,
    });
  }
};

//delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting doctor",
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

//view single doctor by ID
const viewDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).select("-password"); // exclude password

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
      message: "Doctor retrieved successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in fetching doctor", error: error.message });
  }
};

//get appointments to the admin panel
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name email phone specialization hospital")
      .sort({ date: -1 });

    if (!appointments || appointments.length === 0)
      return res.status(404).json({ message: "No appointments found" });
    return res.status(200).json({
      message: "Appointments retrieved successfully",
      count: appointments.length,
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

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentsToday = await Appointment.countDocuments({
      date: { $gte: today, $lt: tomorrow },
    });

    const specializations = await Doctor.distinct("specialization");
    const activeSpecializations = specializations.filter((s) => s).length;

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const doctorsThisMonth = await Doctor.countDocuments({
      createdAt: { $gte: firstDayOfMonth },
    });

    const patientsThisMonth = await Patient.countDocuments({
      createdAt: { $gte: firstDayOfMonth },
    });

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const appointmentsYesterday = await Appointment.countDocuments({
      date: { $gte: yesterday, $lt: today },
    });

    const appointmentChange =
      appointmentsYesterday > 0
        ? (
            ((appointmentsToday - appointmentsYesterday) /
              appointmentsYesterday) *
            100
          ).toFixed(1)
        : 0;

    return res.status(200).json({
      message: "Dashboard statistics retrieved successfully",
      stats: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        appointmentsToday,
        activeSpecializations,
        doctorsThisMonth,
        patientsThisMonth,
        appointmentChange: `${
          appointmentChange > 0 ? "+" : ""
        }${appointmentChange}%`,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching dashboard statistics",
      error: error.message,
    });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .select("-password")
      .sort({ createdAt: -1 });

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    return res.status(200).json({
      message: "Patients retrieved successfully",
      count: patients.length,
      patients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching patients",
      error: error.message,
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    )
      .populate("patient", "name email phone")
      .populate("doctor", "name email phone specialization");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating appointment status",
      error: error.message,
    });
  }
};

// Update patient status (Active/Inactive)
const updatePatientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status. Must be 'Active' or 'Inactive'" 
      });
    }

    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ 
        success: false, 
        message: "Patient not found" 
      });
    }

    patient.status = status;
    await patient.save();

    return res.status(200).json({
      success: true,
      message: `Patient status updated to ${status}`,
      patient
    });
  } catch (error) {
    console.error("Error updating patient status:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error updating patient status" 
    });
  }
};

export {
  addDoctor,
  updateDoctor,
  deleteDoctor,
  adminLogin,
  viewDoctorList,
  viewDoctorById,
  getAppointments,
  getDashboardStats,
  getAllPatients,
  updateAppointmentStatus,
  updatePatientStatus,
};
