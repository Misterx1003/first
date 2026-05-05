import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    delivery: "nova_poshta", // nova_poshta або ukrposhta
  });

  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.city || !formData.phone || !formData.address) {
      toast.error("⚠️ Будь ласка, заповніть усі поля!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("⚠️ Кошик порожній!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        userName: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        delivery: formData.delivery,
        products: cartItems,
      });

      const { order } = response.data;

      setOrderSuccess(order);
      clearCart();
      toast.success("✅ Замовлення оформлено!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Сталася помилка при оформленні замовлення.");
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-green-100 dark:bg-green-900">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300">
          🎉 Вітаю з оформленням товару!
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Ваше замовлення обробляється.
        </p>
        <p className="mt-2 text-gray-800 dark:text-gray-200">
          Трек-номер: <span className="font-mono">{orderSuccess.trackingNumber}</span>
        </p>
        <p className="mt-1">
          Служба доставки: <strong>{orderSuccess.delivery}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
          💳 Оформлення замовлення
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Ваше ім'я"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <input
            name="city"
            placeholder="Місто"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <input
            name="address"
            placeholder="Адреса"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <input
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />

          <select
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            <option value="nova_poshta">Нова Пошта</option>
            <option value="ukrposhta">Укрпошта</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Оформити замовлення
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;