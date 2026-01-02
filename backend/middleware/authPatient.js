import jwt from "jsonwebtoken";

const authPatient = (req, res, next) => {
  try {
    // Check both authorization header and token header
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if it's a patient
    if (decoded.role !== "patient") {
      return res
        .status(403)
        .json({ message: "Access denied. Patient role required." });
    }

    // Attach patient info to request
    req.patient = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authPatient;
