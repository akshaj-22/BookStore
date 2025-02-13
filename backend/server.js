const express = require("express");
const cors = require("cors");
const { connectDB, initializeTables } = require("./src/models/index");
const authRoutes = require("./src/routes/authRoutes");
const bookRoutes = require("./src/routes/bookRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
initializeTables();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
