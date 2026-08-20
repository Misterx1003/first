import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Захист від некоректного значення cart
  const safeCart = Array.isArray(cart) ? cart : [];

  // Загальна сума
  const total = safeCart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // Перехід до оформлення замовлення
  const checkoutHandler = () => {
    if (!user) {
      toast.error("Увійдіть, щоб оформити замовлення");
      navigate("/login");
      return;
    }

    if (safeCart.length === 0) {
      toast.error("Кошик порожній");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Заголовок */}
        <h1 className="text-3xl font-bold mb-6">
          Кошик
        </h1>

        {/* Порожній кошик */}
        {safeCart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">

            <div className="text-5xl mb-4">
              🛒
            </div>

            <h2 className="text-xl font-semibold mb-2">
              Ваш кошик порожній
            </h2>

            <p className="text-gray-500 mb-6">
              Додайте товари з каталогу,
              щоб оформити замовлення.
            </p>

            <button
              onClick={() => navigate("/catalog")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Перейти до каталогу
            </button>

          </div>
        ) : (

          /* Товари в кошику */
          <div className="space-y-4">

            {safeCart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >

                {/* Інформація про товар */}
                <div className="flex items-center gap-4">

                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}

                  <div>

                    <h2 className="font-semibold text-lg">
                      {item.name}
                    </h2>

                    <p className="text-gray-500">
                      {item.price} ₴ ×{" "}
                      {item.quantity || 0}
                    </p>

                    <p className="font-semibold mt-1">
                      {Number(item.price || 0) *
                        Number(item.quantity || 0)}{" "}
                      ₴
                    </p>

                  </div>

                </div>

                {/* Видалення товару */}
                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Видалити
                </button>

              </div>
            ))}

            {/* Підсумок */}
            <div className="bg-white rounded-xl shadow p-6 mt-6">

              <div className="flex justify-between items-center text-xl font-bold">

                <span>
                  Разом:
                </span>

                <span>
                  {total} ₴
                </span>

              </div>

              {/* Оформлення */}
              <button
                onClick={checkoutHandler}
                className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Оформити замовлення
              </button>

              {/* Продовжити покупки */}
              <button
                onClick={() => navigate("/catalog")}
                className="w-full mt-3 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg transition"
              >
                Продовжити покупки
              </button>

              {/* Очистити кошик */}
              <button
                onClick={clearCart}
                className="w-full mt-3 text-red-600 hover:text-red-700 py-2 transition"
              >
                Очистити кошик
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}