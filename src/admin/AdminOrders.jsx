
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Отримання токена адміністратора
  const getAdminHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  // Завантаження всіх замовлень
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/admin/all`, {
        headers: getAdminHeaders(),
      });

      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Помилка завантаження замовлень:", error);
      toast.error(
        error.response?.data?.message || "Не вдалося завантажити замовлення"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Позначення замовлення як оплаченого
  const markAsPaid = async (order) => {
    const confirmed = window.confirm(
      `Ти впевнений, що кошти за замовлення №${order._id} фактично отримані?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(order._id);

      const response = await axios.patch(
        `${API_URL}/admin/${order._id}/payment-status`,
        {},
        {
          headers: getAdminHeaders(),
        }
      );

      setOrders((previousOrders) =>
        previousOrders.map((item) =>
          item._id === order._id ? response.data.order : item
        )
      );

      toast.success("Оплату успішно підтверджено!");
    } catch (error) {
      console.error("Помилка оновлення оплати:", error);
      toast.error(
        error.response?.data?.message || "Не вдалося оновити оплату"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Форматування дати
  const formatDate = (date) => {
    if (!date) return "Невідомо";

    return new Date(date).toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Назва способу оплати
  const getPaymentMethod = (method) => {
    switch (method) {
      case "bank_transfer":
        return "Банківський переказ";
      case "cod":
        return "Оплата при отриманні";
      default:
        return method || "Не вказано";
    }
  };

  // Назва способу доставки
  const getDelivery = (delivery) => {
    switch (delivery) {
      case "nova_poshta":
        return "Нова пошта";
      case "ukrposhta":
        return "Укрпошта";
      default:
        return delivery || "Не вказано";
    }
  };

  // Статус оплати
  const getPaymentStatus = (status) => {
    switch (status) {
      case "paid":
        return {
          label: "Оплачено",
          className: "bg-green-100 text-green-700",
        };
      case "failed":
        return {
          label: "Помилка оплати",
          className: "bg-red-100 text-red-700",
        };
      case "refunded":
        return {
          label: "Повернено",
          className: "bg-purple-100 text-purple-700",
        };
      default:
        return {
          label: "Очікує оплати",
          className: "bg-yellow-100 text-yellow-700",
        };
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Завантаження замовлень...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Керування замовленнями
        </h1>

        <button
          onClick={fetchOrders}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Оновити список
        </button>
      </div>

      <p className="mb-5 text-gray-600">
        Усього замовлень: <strong>{orders.length}</strong>
      </p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500 text-lg">
            Замовлень поки немає.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const payment = getPaymentStatus(order.paymentStatus);

            return (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md border p-5"
              >
                <div className="flex flex-wrap justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-lg font-bold">
                      Замовлення №{order._id}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold h-fit ${payment.className}`}
                  >
                    {payment.label}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Дані покупця
                    </h3>

                    <p>
                      <strong>Ім'я:</strong>{" "}
                      {order.name || "Не вказано"}
                    </p>

                    <p>
                      <strong>Телефон:</strong>{" "}
                      {order.phone || "Не вказано"}
                    </p>

                    <p>
                      <strong>Місто:</strong>{" "}
                      {order.city || "Не вказано"}
                    </p>

                    <p>
                      <strong>Адреса:</strong>{" "}
                      {order.address || "Не вказано"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Доставка та оплата
                    </h3>

                    <p>
                      <strong>Доставка:</strong>{" "}
                      {getDelivery(order.delivery)}
                    </p>

                    <p>
                      <strong>Спосіб оплати:</strong>{" "}
                      {getPaymentMethod(order.paymentMethod)}
                    </p>

                    <p>
                      <strong>Номер відстеження:</strong>{" "}
                      {order.trackingNumber || "Не присвоєно"}
                    </p>

                    <p>
                      <strong>Статус замовлення:</strong>{" "}
                      {order.status || "Не вказано"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">
                    Товари в замовленні
                  </h3>

                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div
                        key={item.productId || index}
                        className="flex flex-wrap justify-between gap-2 text-sm bg-gray-50 p-3 rounded-lg"
                      >
                        <span>
                          {item.name || "Товар"} ×{" "}
                          {item.quantity || 1}
                        </span>

                        <span className="font-medium">
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 1)
                          ).toFixed(2)}{" "}
                          $
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
                    <p className="text-xl font-bold">
                      Разом:{" "}
                      {Number(order.totalPrice || 0).toFixed(2)} $
                    </p>

                    {order.paymentStatus === "pending" && (
                      <button
                        onClick={() => markAsPaid(order)}
                        disabled={updatingId === order._id}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg font-semibold"
                      >
                        {updatingId === order._id
                          ? "Оновлення..."
                          : "Позначити як оплачено"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
