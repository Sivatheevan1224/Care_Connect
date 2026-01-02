import express from "express";
import { addDoctor } from "../controller/admin.controller.js";
import { upload } from "../middleware/multer.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", upload.any(), addDoctor);

export default adminRouter;
