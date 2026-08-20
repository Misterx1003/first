const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");


// ==========================================
// Генератор трек-номера
// ==========================================

function generateTrackingNumber(delivery) {
  const prefix =
    delivery === "nova_poshta"
      ? "NP"
      : "UP";

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
      items,
    } = req.body;


    // ======================================
    // Перевірка основних даних
    // ======================================

    if (
      !name ||
      !city ||
      !address ||
      !phone ||
      !delivery
    ) {
      return res.status(400).json({
        message:
          "Будь ласка, заповніть усі поля",
      });
    }


    // ======================================
    // Перевірка кошика
    // ======================================

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Кошик порожній",
      });
    }


    // ======================================
    // Рахуємо загальну суму
    // ======================================

    const totalPrice = items.reduce(
      (sum, item) => {
        const price = Number(
          item.price || 0
        );

        const quantity = Number(
          item.quantity || 0
        );

        return sum + price * quantity;
      },
      0
    );


    // ======================================
    // Генеруємо трек-номер
    // ======================================

    const trackingNumber =
      generateTrackingNumber(delivery);


    // ======================================
    // Створюємо замовлення
    // ======================================

    const newOrder = new Order({
      user: req.user.id,

      name,
      city,
      address,
      phone,
      delivery,

      items,

      totalPrice,

      trackingNumber,
    });


    // ======================================
    // Зберігаємо в MongoDB
    // ======================================

    await newOrder.save();


    // ======================================
    // Відповідь frontend
    // ======================================

    res.status(201).json({
      message:
        "Замовлення створено ✅ Менеджер скоро подзвонить.",

      order: newOrder,

      trackingNumber,
    });

  } catch (err) {

    console.error(
      "Помилка створення замовлення:",
      err
    );

    res.status(500).json({
      message:
        "Помилка створення замовлення",
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

    res.json(orders);

  } catch (err) {

    console.error(
      "Помилка отримання замовлень:",
      err
    );

    res.status(500).json({
      message:
        "Помилка сервера",
    });
  }
});


module.exports = router;