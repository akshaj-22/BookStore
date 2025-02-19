const jwt = require("jsonwebtoken");
require("dotenv").config();


const authenticateUser = (req, res, next) => {
  console.log("Cookies received:", req.cookies); 
  const token = req.cookies?.Authtoken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};

// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// Middleware to check if the user is a regular user
const authorizeUser = (req, res, next) => {
  if (req.user.userType !== "user") {
    return res.status(403).json({ error: "Access denied. Users only." });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin, authorizeUser };
