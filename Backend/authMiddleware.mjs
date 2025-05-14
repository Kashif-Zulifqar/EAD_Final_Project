import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from the request header
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied! No token provided." });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, "your_secret_key"); // Use your actual secret key

    // 3️⃣ Attach user ID to the request object
    req.userID = decoded.userId;

    next(); // Move to the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token!" });
  }
};

module.exports = authMiddleware;
