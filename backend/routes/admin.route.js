import express from "express";
import {
  adminLogin,
  addDoctor,
  viewDoctorList,
} from "../controller/admin.controller.js";
import { upload } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", adminAuth, upload.any(), addDoctor);
adminRouter.get("/view-doctor", adminAuth, viewDoctorList);
adminRouter.post("/login", adminLogin);

export default adminRouter;
