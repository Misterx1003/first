const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: Number, // ✅ ВАЖЛИВО
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ 1 user = 1 review
reviewSchema.index(
  { productId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Review", reviewSchema);