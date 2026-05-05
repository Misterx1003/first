import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function OrderHistory() {
  const { orders } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Історія замовлень</h2>
        <p>У вас ще немає жодного замовлення.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Історія замовлень</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded shadow-sm">
            <p><strong>Дата:</strong> {order.date}</p>
            <p><strong>Сума:</strong> {order.total} ₴</p>
            <p><strong>Статус:</strong> 
              <span
                className={`ml-2 font-semibold ${
                  order.status === "В обробці"
                    ? "text-yellow-500"
                    : order.status === "Відправлено"
                    ? "text-blue-500"
                    : "text-green-600"
                }`}
              >
                {order.status}
              </span>
            </p>

            <ul className="list-disc ml-6 mt-2">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity} — {item.price} ₴
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}