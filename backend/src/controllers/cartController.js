const express = require("express");
const { Cart, Book } = require("../models");
const { authenticateUser, authorizeUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user's cart (Only Users)
router.get("/", authenticateUser, authorizeUser, async (req, res) => {
  const cartItems = await Cart.findAll({
    where: { userId: req.user.userId },
    include: [{ model: Book, attributes: ["title", "description", "price"] }],
  });
  res.json(cartItems);
});

// Add book to cart (Only Users)
router.post("/", authenticateUser, authorizeUser, async (req, res) => {
  try {
    console.log("User from token:", req.user); 

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    }

    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    // Check if the book is already in the cart
    const existingCartItem = await Cart.findOne({ where: { userId: req.user.userId, bookId } });
    if (existingCartItem) {
      return res.status(400).json({ message: "Book is already in the cart" });
    }

    // Add book to cart
    const cartItem = await Cart.create({ userId: req.user.userId, bookId });
    res.json(cartItem);
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ error: error.message });
  }
});



// Remove book from cart (Only Users)
router.delete("/:cartId", authenticateUser, authorizeUser, async (req, res) => {
  const cartItem = await Cart.findOne({ where: { id: req.params.cartId, userId: req.user.userId } });

  if (!cartItem) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  await cartItem.destroy();
  res.json({ message: "Book removed from cart" });
});

module.exports = router;