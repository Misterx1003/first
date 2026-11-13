const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Order = require("../models/Order");

const auth = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

// ==========================================
// Генератор демонстраційного трек-номера
// Увага: це не справжня накладна перевізника
// ==========================================

function generateTrackingNumber(delivery) {
  const prefix =
    delivery === "nova_poshta" ? "NP" : "UP";

  const randomNum = Math.floor(
    100000 + Math.random() * 900000
  );

  return `${prefix}${randomNum}`;
}

// ==========================================
// СТВОРЕННЯ ЗАМОВЛЕННЯ
// ==========================================

router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      city,
      address,
      phone,
      delivery,
      paymentMethod,
      items,
    } = req.body;

    // Перевірка основних даних
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof city !== "string" ||
      !city.trim() ||
      typeof address !== "string" ||
      !address.trim() ||
      typeof phone !== "string" ||
      !phone.trim()
    ) {
      return res.status(400).json({
        message: "Будь ласка, заповніть усі поля",
      });
    }

    // Перевірка способу доставки
    if (!["nova_poshta", "ukrposhta"].includes(delivery)) {
      return res.status(400).json({
        message: "Оберіть коректний спосіб доставки",
      });
    }

    // Перевірка способу оплати
    if (!["cod", "bank_transfer"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Оберіть коректний спосіб оплати",
      });
    }

    // Перевірка кошика
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Кошик порожній",
      });
    }

    // Перевірка товарів і розрахунок суми
    let totalPrice = 0;

    for (const item of items) {
      const price = Number(item?.price);
      const quantity = Number(item?.quantity);

      if (
        !item ||
        typeof item.name !== "string" ||
        !item.name.trim() ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Дані одного з товарів некоректні",
        });
      }

      totalPrice += price * quantity;
    }

    // Захист від некоректної загальної суми
    if (!Number.isFinite(totalPrice)) {
      return res.status(400).json({
        message: "Не вдалося розрахувати суму замовлення",
      });
    }

    // Формуємо товари
    const orderItems = items.map((item) => ({
      ...(item.productId
        ? { productId: item.productId }
        : {}),
      name: item.name.trim(),
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    // Генеруємо демонстраційний трек-номер
    const trackingNumber = generateTrackingNumber(delivery);

    // Створюємо замовлення
    const newOrder = new Order({
      user: req.user.id,
      name: name.trim(),
      city: city.trim(),
      address: address.trim(),
      phone: phone.trim(),
      delivery,
      paymentMethod,
      items: orderItems,
      totalPrice,
      trackingNumber,
    });

    // Зберігаємо в MongoDB
    await newOrder.save();

    return res.status(201).json({
      message: "Замовлення створено ✅ Менеджер скоро подзвонить.",
      order: newOrder,
      trackingNumber,
    });
  } catch (err) {
    console.error("Помилка створення замовлення:", err);

    return res.status(500).json({
      message: "Помилка створення замовлення",
    });
  }
});

// ==========================================
// МОЇ ЗАМОВЛЕННЯ
// ==========================================

router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.json(orders);
  } catch (err) {
    console.error("Помилка отримання замовлень:", err);

    return res.status(500).json({
      message: "Помилка сервера",
    });
  }
});

// ==========================================
// ADMIN: ОТРИМАТИ ВСІ ЗАМОВЛЕННЯ
// ==========================================

router.get("/admin/all", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return res.json(orders);
  } catch (err) {
    console.error("Помилка отримання всіх замовлень:", err);

    return res.status(500).json({
      message: "Не вдалося отримати замовлення",
    });
  }
});

// ==========================================
// ADMIN: ПОЗНАЧИТИ ЗАМОВЛЕННЯ ОПЛАЧЕНИМ
// ==========================================

router.patch(
  "/admin/:id/payment-status",
  verifyAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Перевірка ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Некоректний номер замовлення",
        });
      }

      // Пошук замовлення
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          message: "Замовлення не знайдено",
        });
      }

      // Перевірка поточного статусу
      if (order.paymentStatus === "paid") {
        return res.json({
          message: "Замовлення вже оплачене",
          order,
        });
      }

      if (
        order.paymentStatus &&
        order.paymentStatus !== "pending"
      ) {
        return res.status(400).json({
          message: "Неможливо змінити цей статус оплати",
        });
      }

      // Змінюємо статус оплати
      order.paymentStatus = "paid";

      // Зберігаємо зміни
      await order.save();

      return res.json({
        message: "Оплату успішно підтверджено",
        order,
      });
    } catch (err) {
      console.error("Помилка зміни статусу оплати:", err);

      return res.status(500).json({
        message: "Не вдалося змінити статус оплати",
      });
    }
  }
);

module.exports = router;