import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";


export default function OrderDetails() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === parseInt(id));

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Замовлення не знайдено 😢</h2>
        <Link
          to="/orders"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          ← Повернутися до списку замовлень
        </Link>
      </div>
    );
  }

  const total = order.items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "в обробці":
        return "bg-yellow-100 text-yellow-800";
      case "відправлено":
        return "bg-blue-100 text-blue-800";
      case "доставлено":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">📄 Деталі замовлення</h1>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Замовлення №{order.id}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-6">📅 {order.date}</p>

        <ul className="space-y-4">
          {order.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              <div className="flex items-center gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                )}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Кількість: {item.quantity || 1}
                  </p>
                </div>
              </div>
              <p className="font-semibold">{item.price * (item.quantity || 1)} ₴</p>
            </li>
          ))}
        </ul>

        <div className="text-right font-semibold text-lg mt-6">
          Разом: {total.toLocaleString()} ₴
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => updateOrderStatus(order.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🔄 Оновити статус
          </button>

          <Link
            to="/orders"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Повернутися до замовлень
          </Link>
        </div>
      </div>
    </div>
  );
}