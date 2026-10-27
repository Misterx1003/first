
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

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    delivery: {
      type: String,
      enum: ["nova_poshta", "ukrposhta"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "bank_transfer"],
      default: "cod",
      required: true,
    },

    status: {
      type: String,
      enum: ["очікує", "в обробці", "доставляється", "доставлено"],
      default: "очікує",
    },

    trackingNumber: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

OrderSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);
