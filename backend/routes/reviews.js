const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middleware/authMiddleware");

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