import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentCardForm from "../components/PaymentCardForm";

export default function Payment() {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Імітація "успішної оплати"
    const orderId = Math.floor(Math.random() * 1000000);
    navigate(`/success?orderId=${orderId}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        💳 Оплата замовлення
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Спосіб оплати:</label>
          <select
            className="w-full p-3 border rounded-xl bg-gray-100 dark:bg-gray-700"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="card">Банківська картка</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
            <option value="liqpay">LiqPay</option>
          </select>
        </div>

        {method === "card" && <PaymentCardForm />}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Підтвердити оплату
        </button>
      </form>
    </div>
  );
}
