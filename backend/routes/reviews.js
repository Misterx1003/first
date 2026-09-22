const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middleware/authMiddleware");

// ===============================
// GET — отримати відгуки товару
// ===============================
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Помилка отримання відгуків:", err);

    res.status(500).json({
      message: "Помилка завантаження відгуків",
    });
  }
});

// ===============================
// POST — додати відгук
// ===============================
router.post("/", auth, async (req, res) => {
  const { productId, rating, comment } = req.body;

  try {
    const review = new Review({
      productId,
      rating,
      comment,
      userId: req.user.id,
      userName: req.user.email,
    });

    await review.save();

    res.status(201).json(review);
  } catch (err) {
    console.error("Помилка додавання відгуку:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Ви вже залишали відгук",
      });
    }

    res.status(500).json({
      message: "Помилка додавання відгуку",
    });
  }
});

module.exports = router;