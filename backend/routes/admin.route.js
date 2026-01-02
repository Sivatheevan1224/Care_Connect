import express from "express";
import {
  adminLogin,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  viewDoctorList,
  viewDoctorById,
  getAppointments,
  getDashboardStats,
  getAllPatients,
  updateAppointmentStatus,
  updatePatientStatus,
} from "../controller/admin.controller.js";
import { upload } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { changeAvailability } from "../controller/doctor.controller.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.any(), addDoctor);
adminRouter.put("/doctors/:id", adminAuth, updateDoctor);
adminRouter.delete("/doctors/:id", adminAuth, deleteDoctor);
adminRouter.get("/view-doctor", adminAuth, viewDoctorList);
adminRouter.get("/doctors", viewDoctorList);
adminRouter.get("/doctors/:id", viewDoctorById);
adminRouter.get("/change-availability", adminAuth, changeAvailability);
adminRouter.get("/appointments", adminAuth, getAppointments);
adminRouter.put(
  "/appointments/:appointmentId",
  adminAuth,
  updateAppointmentStatus
);
adminRouter.get("/dashboard-stats", adminAuth, getDashboardStats);
adminRouter.get("/patients", adminAuth, getAllPatients);
adminRouter.put("/patients/:id/status", adminAuth, updatePatientStatus);
adminRouter.post("/login", adminLogin);

export default adminRouter;
