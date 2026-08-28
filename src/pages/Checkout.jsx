import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    city: "",
    address: "",
    phone: "",
    delivery: "nova_poshta",
  });

  const [loading, setLoading] = useState(false);

  // Захист від некоректного cart
  const safeCart = Array.isArray(cart) ? cart : [];

  // Загальна сума
  const total = safeCart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // Зміна полів форми
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Оформлення замовлення
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевірка авторизації
    if (!user || !token) {
      toast.error("Увійдіть, щоб оформити замовлення");
      navigate("/login");
      return;
    }

    // Перевірка кошика
    if (safeCart.length === 0) {
      toast.error("Кошик порожній");
      navigate("/cart");
      return;
    }

    // Перевірка форми
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.address.trim() ||
      !formData.delivery
    ) {
      toast.error("Будь ласка, заповніть усі поля");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          city: formData.city.trim(),
          address: formData.address.trim(),
          delivery: formData.delivery,
          items: safeCart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Замовлення оформлено!");

      // Очищаємо кошик
      clearCart();

      // Переходимо до замовлень
      navigate("/orders");
    } catch (err) {
      console.error(
        "Помилка оформлення замовлення:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "❌ Помилка оформлення замовлення"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">

          {/* Заголовок */}
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Оформлення замовлення
          </h1>

          {/* Товари */}
          <div className="mb-6">

            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Ваше замовлення
            </h2>

            {safeCart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-3 text-gray-700 dark:text-gray-200"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span className="font-semibold">
                  {Number(item.price || 0) *
                    Number(item.quantity || 0)}{" "}
                  ₴
                </span>
              </div>
            ))}

            {/* Загальна сума */}
            <div className="flex justify-between text-xl font-bold mt-4 text-gray-800 dark:text-white">
              <span>Разом:</span>

              <span>{total} ₴</span>
            </div>

          </div>

          {/* Форма */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Ім'я */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-800 dark:text-white"
              >
                Ім'я
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше ім'я"
                autoComplete="name"
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Телефон */}
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 font-medium text-gray-800 dark:text-white"
              >
                Телефон
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+380..."
                autoComplete="tel"
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Місто */}
            <div>
              <label
                htmlFor="city"
                className="block mb-1 font-medium text-gray-800 dark:text-white"
              >
                Місто
              </label>

              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ваше місто"
                autoComplete="address-level2"
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Адреса */}
            <div>
              <label
                htmlFor="address"
                className="block mb-1 font-medium text-gray-800 dark:text-white"
              >
                Адреса
              </label>

              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Адреса / відділення"
                autoComplete="street-address"
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Доставка */}
            <div>
              <label
                htmlFor="delivery"
                className="block mb-1 font-medium text-gray-800 dark:text-white"
              >
                Спосіб доставки
              </label>

              <select
                id="delivery"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="nova_poshta">
                  Нова Пошта
                </option>

                <option value="ukrposhta">
                  Укрпошта
                </option>
              </select>
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Оформлення..."
                : "Оформити замовлення"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}