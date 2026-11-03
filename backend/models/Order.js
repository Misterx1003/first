
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // ТОВАРИ ЗАМОВЛЕННЯ
    // ==========================================

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    // ==========================================
    // ЗАГАЛЬНА СУМА
    // ==========================================

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================================
    // СПОСІБ ДОСТАВКИ
    // ==========================================

    delivery: {
      type: String,
      enum: ["nova_poshta", "ukrposhta"],
      required: true,
    },

    // ==========================================
    // СПОСІБ ОПЛАТИ
    // ==========================================

    paymentMethod: {
      type: String,
      enum: ["cod", "bank_transfer"],
      default: "cod",
      required: true,
    },

    // ==========================================
    // СТАТУС ОПЛАТИ
    // ==========================================

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      required: true,
    },

    // ==========================================
    // СТАТУС ЗАМОВЛЕННЯ
    // ==========================================

    status: {
      type: String,
      enum: [
        "очікує",
        "в обробці",
        "доставляється",
        "доставлено",
      ],
      default: "очікує",
    },

    // ==========================================
    // ТРЕК-НОМЕР
    // ==========================================

    trackingNumber: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// ІНДЕКС ДЛЯ ПОШУКУ ЗАМОВЛЕНЬ КОРИСТУВАЧА
// ==========================================

OrderSchema.index({
  user: 1,
  createdAt: -1,
});

module.exports = mongoose.model("Order", OrderSchema);
