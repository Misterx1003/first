import Order from "./pages/Order";
import License from "./pages/License";
import History from "./pages/History";
import Favorites from "./pages/Favorites";

// Каталог і товар
import Catalog from "./components/Catalog";
import ProductPage from "./components/ProductPage";

// Адмін
import AdminPanel from "./admin/AdminPanel";
import AdminLogin from "./admin/AdminLogin";
import AdminProducts from "./admin/AdminProducts";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";

// Контексти
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CompareProvider>
          <Router>

            {/* Навігація */}
            <Navbar />

            {/* Toast-повідомлення */}
            <Toaster position="top-right" />

            <Routes>

              {/* =========================
                  ГОЛОВНІ СТОРІНКИ
              ========================= */}

              <Route path="/" element={<Home />} />

              <Route path="/магазин" element={<Store />} />


              {/* =========================
                  КАТАЛОГ
              ========================= */}

              <Route path="/catalog" element={<Catalog />} />

              <Route path="/каталог" element={<Catalog />} />


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
                  УЛЮБЛЕНІ ТОВАРИ
              ========================= */}

              <Route
                path="/favorites"
                element={<Favorites />}
              />


              {/* =========================
                  ІНФОРМАЦІЯ ПРО КОМПАНІЮ
              ========================= */}

              <Route
                path="/history"
                element={<History />}
              />

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
                  Тільки для авторизованого
                  користувача
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
                  АДМІН-ПАНЕЛЬ
              ========================= */}

              <Route
                path="/admin/login"
                element={<AdminLogin />}
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              >

                {/* Користувачі */}
                <Route
                  path="users"
                  element={<AdminUsers />}
                />

                {/* Товари */}
                <Route
                  path="products"
                  element={<AdminProducts />}
                />

                {/* Замовлення */}
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