import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    // Check both authorization header and token header
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach admin info to request
    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuth;
