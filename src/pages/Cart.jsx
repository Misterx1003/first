
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
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const { user } = useAuth();
  const navigate = useNavigate();

  const safeCart = Array.isArray(cart) ? cart : [];

  const total = safeCart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const formatPrice = (price) =>
    Number(price).toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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
        <h1 className="text-3xl font-bold mb-6">
          Кошик
        </h1>

        {safeCart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="text-5xl mb-4">🛒</div>

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
          <div className="space-y-4">
            {safeCart.map((item) => {
              const quantity = Math.max(
                1,
                Number(item.quantity || 1)
              );

              const price = Number(item.price || 0);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
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
                        {formatPrice(price)} ₴ за одиницю
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={quantity <= 1}
                          aria-label={`Зменшити кількість: ${item.name}`}
                          className="w-9 h-9 rounded-lg border border-gray-300 font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span
                          className="min-w-6 text-center font-semibold"
                          aria-label="Кількість"
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Збільшити кількість: ${item.name}`}
                          className="w-9 h-9 rounded-lg border border-gray-300 font-bold text-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold mt-2">
                        {formatPrice(price * quantity)} ₴
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Видалити
                  </button>
                </div>
              );
            })}

            <div className="bg-white rounded-xl shadow p-6 mt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Разом:</span>
                <span>{formatPrice(total)} ₴</span>
              </div>

              <button
                onClick={checkoutHandler}
                className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Оформити замовлення
              </button>

              <button
                onClick={() => navigate("/catalog")}
                className="w-full mt-3 border border-gray-300 hover:bg-gray-100 py-3 rounded-lg transition"
              >
                Продовжити покупки
              </button>

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
