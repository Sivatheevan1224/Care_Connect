import Doctor from "../model/doctor.model.js";

const changeAvailability = async (req, res) => {
  try {
    const { doctorId, availability } = req.body;

    if (!doctorId || availability === undefined) {
      return res
        .status(400)
        .json({ message: "Doctor ID and availability are required" });
    }

    // Find doctor by ID and update availability
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { availability },
      { new: true }
    ).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({
      message: "Doctor availability updated successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in changing the availability of doctors",
      error: error.message,
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const { specialization, hospital } = req.query;

    const filter = {};
    if (specialization) filter.specialization = specialization;
    if (hospital) filter.hospital = hospital;

    // Fetch doctors, exclude sensitive fields
    const doctors = await Doctor.find(filter).select(
      "name email phone specialization hospital experience image availability"
    );

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors available" });
    }

    return res.status(200).json({
      message: "Doctor list retrieved successfully",
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in fetching doctor list",
      error: error.message,
    });
  }
};

export { changeAvailability, doctorList };
