import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConfig.js";
import cloudinaryConfig from "./config/cloudinary.js";
import adminRouter from "./routes/admin.route.js";
import doctorRoute from "./routes/doctor.route.js";
import patientRoute from "./routes/patient.route.js";

//app config
const app = express();
const PORT = process.env.PORT;
cloudinaryConfig();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRoute);
app.use("/api/patient", patientRoute);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Care Connect API is running",
    version: "1.0.0",
    endpoints: {
      admin: "/api/admin",
      doctor: "/api/doctor",
      patient: "/api/patient"
    }
  });
});

// Health check endpoint for Azure
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  connectDB();
});
