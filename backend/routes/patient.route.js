import express from "express";
import {
  loginPatient,
  registerPatient,
} from "../controller/patient.controller.js";

const patientRoute = new express.Router();

patientRoute.post("/register", registerPatient);
patientRoute.post("/login", loginPatient);

export default patientRoute;
