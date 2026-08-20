import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // ==========================================
  // Завантаження моїх замовлень
  // ==========================================

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

        setOrders(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (err) {
        console.error(
          "Помилка завантаження замовлень:",
          err
        );

        toast.error(
          "Не вдалося завантажити замовлення"
        );
      }
    };

    fetchOrders();
  }, []);

  // ==========================================
  // Генерація PDF-чека
  // ==========================================

  const generateReceipt = async (order) => {
    try {
      const doc = new jsPDF();

      // ========================================
      // Завантажуємо Unicode-шрифт
      // ========================================

      const fontResponse = await fetch(
        "/fonts/NotoSans-Regular.ttf"
      );

      if (!fontResponse.ok) {
        throw new Error(
          "Не вдалося завантажити NotoSans-Regular.ttf"
        );
      }

      const fontBuffer =
        await fontResponse.arrayBuffer();

      const fontBytes =
        new Uint8Array(fontBuffer);

      let binary = "";

      for (
        let i = 0;
        i < fontBytes.length;
        i++
      ) {
        binary += String.fromCharCode(
          fontBytes[i]
        );
      }

      const fontBase64 =
        btoa(binary);

      // Додаємо шрифт у PDF
      doc.addFileToVFS(
        "NotoSans-Regular.ttf",
        fontBase64
      );

      doc.addFont(
        "NotoSans-Regular.ttf",
        "NotoSans",
        "normal"
      );

      doc.setFont(
        "NotoSans",
        "normal"
      );

      // ========================================
      // Заголовок
      // ========================================

      doc.setFontSize(18);

      doc.text(
        "Магазин електроніки",
        14,
        20
      );

      doc.setFontSize(11);

      // ========================================
      // Інформація про замовлення
      // ========================================

      doc.text(
        `Номер замовлення: #${order._id}`,
        14,
        30
      );

      doc.text(
        `Дата: ${new Date(
          order.createdAt
        ).toLocaleString("uk-UA")}`,
        14,
        37
      );

      doc.text(
        `Статус: ${order.status || "-"}`,
        14,
        44
      );

      // ========================================
      // Дані покупця
      // ========================================

      doc.text(
        `Ім'я: ${order.name || "-"}`,
        14,
        51
      );

      doc.text(
        `Телефон: ${order.phone || "-"}`,
        14,
        58
      );

      doc.text(
        `Місто: ${order.city || "-"}`,
        14,
        65
      );

      doc.text(
        `Адреса: ${order.address || "-"}`,
        14,
        72
      );

      // ========================================
      // Доставка
      // ========================================

      const deliveryName =
        order.delivery === "nova_poshta"
          ? "Нова Пошта"
          : "Укрпошта";

      doc.text(
        `Доставка: ${deliveryName}`,
        14,
        79
      );

      // ========================================
      // Трек-номер
      // ========================================

      if (order.trackingNumber) {
        doc.text(
          `Трек-номер: ${order.trackingNumber}`,
          14,
          86
        );
      }

      // ========================================
      // Таблиця товарів
      // ========================================

      const tableData = (
        order.items || []
      ).map((item, index) => {
        const quantity = Number(
          item.quantity || 0
        );

        const price = Number(
          item.price || 0
        );

        const itemTotal =
          price * quantity;

        return [
          index + 1,
          item.name || "Товар",
          quantity,
          `${price.toFixed(2)} ₴`,
          `${itemTotal.toFixed(2)} ₴`,
        ];
      });

      autoTable(doc, {
        startY: 94,

        head: [
          [
            "#",
            "Назва товару",
            "Кількість",
            "Ціна",
            "Сума",
          ],
        ],

        body: tableData,

        theme: "grid",

        styles: {
          font: "NotoSans",
          fontStyle: "normal",
          fontSize: 9,
        },

        headStyles: {
          font: "NotoSans",
          fontStyle: "normal",
        },

        bodyStyles: {
          font: "NotoSans",
          fontStyle: "normal",
        },

        columnStyles: {
          0: {
            cellWidth: 10,
          },

          2: {
            cellWidth: 25,
          },

          3: {
            cellWidth: 28,
          },

          4: {
            cellWidth: 28,
          },
        },
      });

      // ========================================
      // Загальна сума
      // ========================================

      const calculatedTotal = (
        order.items || []
      ).reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 0),
        0
      );

      // Використовуємо totalPrice з MongoDB,
      // якщо він існує
      const total =
        order.totalPrice ??
        calculatedTotal;

      // Позиція після таблиці
      const finalY =
        doc.lastAutoTable?.finalY || 100;

      doc.setFont(
        "NotoSans",
        "normal"
      );

      doc.setFontSize(14);

      doc.text(
        `Разом до сплати: ${Number(
          total
        ).toFixed(2)} ₴`,
        14,
        finalY + 15
      );

      // ========================================
      // Нижній текст
      // ========================================

      doc.setFontSize(9);

      doc.text(
        "Дякуємо за ваше замовлення!",
        14,
        finalY + 25
      );

      // ========================================
      // Збереження PDF
      // ========================================

      doc.save(
        `Замовлення_${order._id}.pdf`
      );

      toast.success(
        "Чек успішно створено!"
      );
    } catch (err) {
      console.error(
        "Помилка створення PDF:",
        err
      );

      toast.error(
        "Не вдалося створити PDF-чек"
      );
    }
  };

  // ==========================================
  // Відображення сторінки
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6">

      <div className="max-w-6xl mx-auto">

        {/* Заголовок */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          📦 Мої замовлення
        </h1>

        {/* Якщо замовлень немає */}
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">

            <div className="text-5xl mb-4">
              📦
            </div>

            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Поки що немає замовлень
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              Тут з'являться ваші замовлення
              після оформлення покупки.
            </p>

          </div>
        ) : (

          /* Список замовлень */
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 shadow-sm"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                {/* Інформація */}
                <div>

                  <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    Замовлення #
                    {order._id}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    <strong>
                      Статус:
                    </strong>{" "}
                    {order.status}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>
                      Дата:
                    </strong>{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleString(
                      "uk-UA"
                    )}
                  </p>

                  {/* Загальна сума */}
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>
                      Сума:
                    </strong>{" "}
                    {Number(
                      order.totalPrice || 0
                    ).toFixed(2)}{" "}
                    ₴
                  </p>

                  {/* Доставка */}
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>
                      Доставка:
                    </strong>{" "}
                    {order.delivery ===
                    "nova_poshta"
                      ? "Нова Пошта"
                      : "Укрпошта"}
                  </p>

                  {/* Трек-номер */}
                  {order.trackingNumber && (
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>
                        Трек-номер:
                      </strong>{" "}
                      {order.trackingNumber}
                    </p>
                  )}

                </div>

                {/* Кнопка PDF */}
                <button
                  onClick={() =>
                    generateReceipt(
                      order
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition font-semibold"
                >
                  💾 Завантажити чек
                </button>

              </div>

              {/* Товари */}
              {order.items &&
                order.items.length > 0 && (
                  <div className="mt-5 border-t pt-4">

                    <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
                      Товари:
                    </h3>

                    <div className="space-y-2">

                      {order.items.map(
                        (item, index) => (
                          <div
                            key={
                              item.productId ||
                              index
                            }
                            className="flex justify-between gap-4 text-sm text-gray-700 dark:text-gray-300"
                          >

                            <span>
                              {item.name}
                              {" × "}
                              {item.quantity}
                            </span>

                            <span className="font-semibold whitespace-nowrap">
                              {(
                                Number(
                                  item.price ||
                                    0
                                ) *
                                Number(
                                  item.quantity ||
                                    0
                                )
                              ).toFixed(2)}{" "}
                              ₴
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

            </div>
          ))
        )}

      </div>
    </div>
  );
}