import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// =========================
// Компоненти
// =========================

import Navbar from "./components/Navbar";
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";
import ProtectedRoute from "./components/ProtectedRoute";

// =========================
// Сторінки
// =========================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Нові сторінки
import Order from "./pages/Order";
import License from "./pages/License";
import History from "./pages/History";
import Favorites from "./pages/Favorites";

// =========================
// Адмін
// =========================

import AdminPanel from "./admin/AdminPanel";
import AdminLogin from "./admin/AdminLogin";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";

// =========================
// Контексти
// =========================

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CompareProvider>
          <Router>
            <Navbar />

            <Toaster position="top-right" />

            <Routes>

              {/* =========================
                  ГОЛОВНА
              ========================= */}

              <Route
                path="/"
                element={<Home />}
              />

              {/* =========================
                  МАГАЗИН
              ========================= */}

              <Route
                path="/магазин"
                element={<Store />}
              />

              {/* =========================
                  КАТАЛОГ
              ========================= */}

              <Route
                path="/catalog"
                element={<Catalog />}
              />

              <Route
                path="/каталог"
                element={<Catalog />}
              />

              {/* =========================
                  ОКРЕМИЙ ТОВАР
              ========================= */}

              <Route
                path="/product/:id"
                element={<ProductPage />}
              />

              {/* =========================
                  КОШИК
              ========================= */}

              <Route
                path="/cart"
                element={<Cart />}
              />

              {/* =========================
                  ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
              ========================= */}

              <Route
                path="/order"
                element={<Order />}
              />

              {/* =========================
                  УЛЮБЛЕНІ
              ========================= */}

              <Route
                path="/favorites"
                element={<Favorites />}
              />

              {/* =========================
                  ІСТОРІЯ РОБІТ
              ========================= */}

              <Route
                path="/history"
                element={<History />}
              />

              {/* =========================
                  ЛІЦЕНЗІЇ
              ========================= */}

              <Route
                path="/licenses"
                element={<License />}
              />

              {/* =========================
                  АВТОРИЗАЦІЯ
              ========================= */}

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              {/* =========================
                  МОЇ ЗАМОВЛЕННЯ
              ========================= */}

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              {/* =========================
                  АДМІН — ВХІД
              ========================= */}

              <Route
                path="/admin/login"
                element={<AdminLogin />}
              />

              {/* =========================
                  АДМІН — ПАНЕЛЬ
              ========================= */}

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              >

                <Route
                  path="users"
                  element={<AdminUsers />}
                />

                <Route
                  path="products"
                  element={<AdminProducts />}
                />

                <Route
                  path="orders"
                  element={<AdminOrders />}
                />

              </Route>

              {/* =========================
                  404
              ========================= */}

              <Route
                path="*"
                element={<NotFound />}
              />

            </Routes>
          </Router>
        </CompareProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;