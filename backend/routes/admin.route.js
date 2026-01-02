import express from "express";
import {
  adminLogin,
  addDoctor,
  viewDoctorList,
  viewDoctorById,
  getAppointments,
  getDashboardStats,
  getAllPatients,
  updateAppointmentStatus,
} from "../controller/admin.controller.js";
import { upload } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { changeAvailability } from "../controller/doctor.controller.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.any(), addDoctor);
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
adminRouter.post("/login", adminLogin);

export default adminRouter;
