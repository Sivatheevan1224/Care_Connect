import express from "express";
import {
  adminLogin,
  addDoctor,
  viewDoctorList,
  viewDoctorById,
} from "../controller/admin.controller.js";
import { upload } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import { changeAvailability } from "../controller/doctor.controller.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.any(), addDoctor);
adminRouter.get("/view-doctor", adminAuth, viewDoctorList);
adminRouter.get("/doctors", viewDoctorList); // Public endpoint for viewing doctors
adminRouter.get("/doctors/:id", viewDoctorById); // Public endpoint for viewing single doctor
adminRouter.get("/change-availability", adminAuth, changeAvailability);
adminRouter.post("/login", adminLogin);

export default adminRouter;
