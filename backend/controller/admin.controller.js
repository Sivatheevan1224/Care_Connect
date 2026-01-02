import Doctor from "../model/doctor.model.js";
import bcrypt from "bcrypt";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      specialization,
      hospital,
      experience,
    } = req.body;
    const imageFile = req.file || req.files?.[0];
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor already exists with this email" });
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile, "doctors");

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      hospital,
      experience,
      image: imageUrl,
    });
    await doctor.save();

    return res.status(201).json({
      message: "Doctor added successfully",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialization: doctor.specialization,
        hospital: doctor.hospital,
        experience: doctor.experience,
        image: doctor.image,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in adding doctor controller",
      error: error.message,
    });
  }
};

export { addDoctor };
