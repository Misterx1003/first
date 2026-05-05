const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// =======================================
// Middleware verifyAdmin
// =======================================
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Токен не надано" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) return res.status(403).json({ message: "Невірний токен" });

    if (admin.role !== "admin")
      return res.status(403).json({ message: "Доступ заборонено" });

    req.admin = admin;
    next();
  });
}

// =======================================
// PUBLIC: Отримати всі товари
// =======================================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
});

// =======================================
// ADMIN: Створити товар
// =======================================
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Помилка при створенні товару" });
  }
});

// =======================================
// ADMIN: Редагувати товар
// =======================================
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Помилка при редагуванні" });
  }
});

// =======================================
// ADMIN: Видалити товар
// =======================================
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Товар видалено" });
  } catch (err) {
    res.status(500).json({ error: "Помилка при видаленні" });
  }
});

module.exports = router;