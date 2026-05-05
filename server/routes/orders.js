const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");


// 🔥 генератор трек-номера
function generateTrackingNumber(delivery) {
  const prefix = delivery === "nova_poshta" ? "NP" : "UP";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}



//////////////////////////////////////////////////
// ✅ СТВОРЕННЯ ЗАМОВЛЕННЯ
//////////////////////////////////////////////////

router.post("/", auth, async (req, res) => {
  try {
    const { name, city, address, phone, delivery, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Кошик порожній",
      });
    }

    // 🔥 рахуємо загальну суму
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const trackingNumber = generateTrackingNumber(delivery);

    const newOrder = new Order({
      user: req.user.id,
      name,
      city,
      address,
      phone,
      delivery,
      items,
      trackingNumber,
      totalPrice, // 🔥
    });

    await newOrder.save();

    res.status(201).json({
      message: "Замовлення створено ✅ Менеджер скоро подзвонить.",
      trackingNumber,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Помилка створення замовлення",
    });
  }
});



//////////////////////////////////////////////////
// ✅ МОЇ ЗАМОВЛЕННЯ
//////////////////////////////////////////////////

router.get("/my", auth, async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Помилка сервера",
    });
  }
});



module.exports = router;