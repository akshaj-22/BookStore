const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const { User } = require("../models");
const { authenticateUser } = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();
router.use(cookieParser());

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, userType });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(email, password);

    const user = await User.findOne({ where: { email } });
    console.log(user, "user");

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed - User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed - Password doesn't match" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("Authtoken", token);

    res.json({
      status: true,
      message: `Login success as ${user.userType}`,
      userType: user.userType,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  res.clearCookie("Authtoken", { httpOnly: true, secure: true, sameSite: "None" });
  res.json({ message: "Logout successful" });
});

// View Profile Route (user/admin)
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, { attributes: ["id", "name", "email", "userType"] });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Profile Route (user/admin)
router.put("/profile", authenticateUser, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.user.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Profile updated successfully",user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
