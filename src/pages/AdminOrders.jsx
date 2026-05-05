import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Керування замовленнями</h2>
        <p>Поки що немає замовлень.</p>
      </div>
    );
  }

  const statuses = ["В обробці", "Відправлено", "Доставлено"];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Адмін-панель — Замовлення</h2>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded shadow-sm">
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Дата:</strong> {order.date}</p>
            <p><strong>Сума:</strong> {order.total} ₴</p>

            <div className="mt-3">
              <label className="font-semibold mr-2">Статус:</label>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="border rounded p-1 bg-white dark:bg-gray-800"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3">
              <p className="font-semibold">Товари:</p>
              <ul className="list-disc ml-6">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} — {item.price} ₴
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}