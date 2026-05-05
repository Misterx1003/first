import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.log("Помилка завантаження замовлень");
      }
    };

    fetchOrders();
  }, []);

  const generateReceipt = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Магазин електроніки ⚡", 14, 20);

    doc.setFontSize(12);
    doc.text(`Номер замовлення: ${order._id}`, 14, 30);
    doc.text(
      `Дата: ${new Date(order.createdAt).toLocaleString()}`,
      14,
      37
    );
    doc.text(`Статус: ${order.status}`, 14, 44);

    const tableData = order.items.map((item, index) => [
      index + 1,
      item.name,
      item.qty,
      `${item.price} ₴`,
      `${item.qty * item.price} ₴`,
    ]);

    doc.autoTable({
      startY: 55,
      head: [["#", "Назва товару", "Кількість", "Ціна", "Сума"]],
      body: tableData,
      theme: "grid",
    });

    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    doc.setFontSize(14);
    doc.text(
      `Разом до сплати: ${total} ₴`,
      14,
      doc.lastAutoTable.finalY + 15
    );

    doc.save(`Order_${order._id}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        📦 Мої замовлення
      </h1>

      {orders.length === 0 ? (
        <p>Поки що немає замовлень.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p>
                  <strong>
                    Замовлення #{order._id}
                  </strong>
                </p>

                <p>Статус: {order.status}</p>

                <p>
                  Дата:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => generateReceipt(order)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                💾 Завантажити чек
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}