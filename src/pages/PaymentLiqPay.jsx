import React, { useContext } from "react";
import CryptoJS from "crypto-js";
import { CartContext } from "../context/CartContext";

export default function PaymentLiqPay() {
  const { cart } = useContext(CartContext);

  const publicKey = process.env.REACT_APP_LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.REACT_APP_LIQPAY_PRIVATE_KEY;

  // Підрахунок суми з кошика
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const createFormData = () => {
    const order = {
      public_key: publicKey,
      version: 3,
      action: "pay",
      amount: totalAmount || "100",
      currency: "UAH",
      description: "Оплата товару у магазині",
      order_id: "ORDER-" + Math.random().toString(36).substring(2, 10),
      result_url: "http://localhost:3000/success",
    };

    const jsonString = JSON.stringify(order);
    const data = btoa(jsonString); // Base64 кодування
    const signature = CryptoJS.SHA1(privateKey + data + privateKey).toString(
      CryptoJS.enc.Base64
    );

    return { data, signature };
  };

  const { data, signature } = createFormData();

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        💳 Оплата через LiqPay
      </h2>
      <p className="text-gray-600 mb-4">
        Сума до сплати: <span className="font-semibold">{totalAmount} ₴</span>
      </p>
      <form
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
      >
        <input type="hidden" name="data" value={data} />
        <input type="hidden" name="signature" value={signature} />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
        >
          🪙 Сплатити через LiqPay
        </button>
      </form>
    </div>
  );
}