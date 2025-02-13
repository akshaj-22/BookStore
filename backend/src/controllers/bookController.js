const express = require("express");
const { Book } = require("../models");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books (Anyone can access)
router.get("/", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// Get book by ID (Anyone can access)
router.get("/:bookId", async (req, res) => {
  const book = await Book.findByPk(req.params.bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// Add a book (Only Admin)
router.post("/", authenticateUser, authorizeAdmin, async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

module.exports = router;
