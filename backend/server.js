const express = require("express");
const cors = require("cors");
const { connectDB, initializeTables } = require("./src/models/index");
const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend origin
      credentials: true, // Allow cookies & auth headers
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    })
  );
app.use(express.json());
app.use(cookieParser());

connectDB();
initializeTables();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));