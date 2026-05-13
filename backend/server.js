const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// ======================================
// 🔗 ПІДКЛЮЧЕННЯ ДО MongoDB
// ======================================
mongoose
  .connect("mongodb://127.0.0.1:27017/shop")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// ======================================
// 📦 ROUTES
// ======================================

// Товари
app.use("/products", require("./routes/products"));

// Користувачі для адміна
app.use("/admin/users", require("./routes/adminUsers"));

// Замовлення
app.use("/api/orders", require("./routes/orders"));

// ⭐⭐⭐ ВІДГУКИ
app.use("/api/reviews", require("./routes/reviews"));


app.use("/api/auth", authRoutes);

// ======================================
// 🔐 АВТОРИЗАЦІЯ АДМІНА
// ======================================

// Тимчасовий адмін акаунт
const ADMIN = {
  username: "admin",
  password: "2468013579", // змінити пізніше
};

// Логін адміна
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username || password !== ADMIN.password) {
    return res.status(401).json({ message: "Невірний логін або пароль" });
  }

  const token = jwt.sign(
    { role: "admin", username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

// Middleware: перевірка токена адміна
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Токен не надано" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) return res.status(403).json({ message: "Невірний токен" });
    if (admin.role !== "admin")
      return res.status(403).json({ message: "Доступ заборонено" });

    req.admin = admin;
    next();
  });
}

// Тест захищеного маршруту
app.get("/admin/protected", verifyAdmin, (req, res) => {
  res.json({ message: "Адмін доступ дозволено!" });
});

// ======================================
// ⚙ ГОЛОВНИЙ ТЕСТОВИЙ МАРШРУТ
// ======================================
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ======================================
// ▶️ ЗАПУСК СЕРВЕРА
// ======================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));