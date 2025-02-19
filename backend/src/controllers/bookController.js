const express = require("express");
const { Book } = require("../models");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books (Anyone can access)
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({ books }); 
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
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

// Delete a book (Only Admin)
router.delete("/:bookId", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await book.destroy();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a book (Only Admin)
router.put("/:bookId", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const book = await Book.findByPk(req.params.bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update book details
    book.title = title || book.title;
    book.description = description || book.description;
    book.price = price || book.price;

    await book.save();
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
