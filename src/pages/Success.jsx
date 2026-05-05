import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Success = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse()); // показуємо останнє замовлення першим
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem("orders");
    setOrders([]);
    toast.success("✅ Історія замовлень очищена");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 dark:bg-green-900 text-center p-4">
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-4">
        🎉 Вітаю з оформленням товару!
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300 mb-6">
        Ваше замовлення успішно оформлено і обробляється. Дякуємо за покупку ❤️
      </p>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded-2xl shadow mb-6 text-left">
        <h3 className="text-xl font-semibold mb-2">Історія замовлень:</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">Немає замовлень 😕</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border-b py-2">
              <p className="font-semibold">🧑 {order.customer.name}</p>
              <p>📍 {order.customer.city}</p>
              <p>📞 {order.customer.phone}</p>
              <p>🛒 Товари:</p>
              <ul className="list-disc list-inside ml-4">
                {order.items.map((item) => (
                  <li key={item.id}>{item.name} — {item.price} ₴</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {orders.length > 0 && (
        <button
          onClick={handleClearOrders}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4 transition"
        >
          🗑 Очистити історію замовлень
        </button>
      )}

      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Повернутися до каталогу
      </Link>
    </div>
  );
};

export default Success;
