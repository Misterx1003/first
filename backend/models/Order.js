const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // 🔐 якщо користувач залогінений
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    // 🔥 НОВЕ — загальна сума
    totalPrice: {
      type: Number,
      required: true,
    },

    delivery: {
      type: String,
      enum: ["nova_poshta", "ukrposhta"],
      required: true,
    },

    status: {
      type: String,
      enum: ["очікує", "в обробці", "доставляється", "доставлено"],
      default: "очікує",
    },

    trackingNumber: {
      type: String,
      default: null, // ✔ краще ніж ""
    },
  },
  { timestamps: true }
);


// 🔥 ПРОФІ — індекс для швидких запитів
OrderSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);