import express from "express";
import authPatient from "../middleware/authPatient.js";

import {
  getProfile,
  loginPatient,
  registerPatient,
  updateProfile,
} from "../controller/patient.controller.js";

const patientRoute = new express.Router();

patientRoute.post("/register", registerPatient);
patientRoute.post("/login", loginPatient);
patientRoute.get("/profile", authPatient, getProfile);
patientRoute.put("/profile", authPatient, updateProfile);

export default patientRoute;
