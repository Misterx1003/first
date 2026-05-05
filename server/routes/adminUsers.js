const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware verifyAdmin
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
// ADMIN: Отримати всіх користувачів
// =======================================
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні користувачів" });
  }
});

// =======================================
// ADMIN: Видалити користувача
// =======================================
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Користувача видалено" });
  } catch (err) {
    res.status(500).json({ error: "Помилка при видаленні користувача" });
  }
});

module.exports = router;