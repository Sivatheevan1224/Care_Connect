import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },

    specialization: {
      type: String,
      required: false,
    },
    hospital: {
      type: String,
      required: false,
    },
    experience: {
      type: Number,
      required: false,
    },
    availablity: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
