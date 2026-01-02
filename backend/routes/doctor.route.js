import express from "express";
import { doctorList } from "../controller/doctor.controller.js";

const doctorRoute = new express.Router();

doctorRoute.get("/list", doctorList);

export default doctorRoute;
