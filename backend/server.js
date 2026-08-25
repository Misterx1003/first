const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth");

const app = express();

// ======================================
// ⚙ НАЛАШТУВАННЯ
// ======================================

app.use(cors());
app.use(express.json());

// ======================================
// 🔗 ПІДКЛЮЧЕННЯ ДО MongoDB ATLAS
// ======================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error ❌:", err);
  });

// ======================================
// 📦 ROUTES
// ======================================

// Товари
app.use("/products", require("./routes/products"));

// Користувачі для адміна
app.use("/admin/users", require("./routes/adminUsers"));

// Замовлення
app.use("/api/orders", require("./routes/orders"));

// Відгуки
app.use("/api/reviews", require("./routes/reviews"));

// Авторизація користувачів
app.use("/api/auth", authRoutes);

// ======================================
// 🔐 АВТОРИЗАЦІЯ АДМІНА
// ======================================

const ADMIN = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
};

// ======================================
// 🔑 ЛОГІН АДМІНА
// ======================================

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username !== ADMIN.username ||
    password !== ADMIN.password
  ) {
    return res.status(401).json({
      message: "Невірний логін або пароль",
    });
  }

  const token = jwt.sign(
    {
      role: "admin",
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({ token });
});

// ======================================
// 🛡️ MIDDLEWARE АДМІНА
// ======================================

function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Токен не надано",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, admin) => {
      if (err) {
        return res.status(403).json({
          message: "Невірний токен",
        });
      }

      if (admin.role !== "admin") {
        return res.status(403).json({
          message: "Доступ заборонено",
        });
      }

      req.admin = admin;

      next();
    }
  );
}

// ======================================
// 🔒 ТЕСТ ЗАХИЩЕНОГО ADMIN ROUTE
// ======================================

app.get(
  "/admin/protected",
  verifyAdmin,
  (req, res) => {
    res.json({
      message: "Адмін доступ дозволено!",
    });
  }
);

// ======================================
// ❤️ HEALTH CHECK
// ======================================

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running!",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// ======================================
// ❌ ОБРОБКА ПОМИЛОК
// ======================================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Внутрішня помилка сервера",
  });
});

// ======================================
// ▶️ ЗАПУСК СЕРВЕРА
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});