import React, { useState, useMemo } from "react";
import { FaCcVisa, FaCcMastercard, FaCreditCard } from "react-icons/fa";

/**
 * Props:
 *  - amount (number | string) — сума, для показу
 *  - onSuccess() — callback після успішної "оплати" (демо)
 */
export default function PaymentCardForm({ amount = null, onSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Форматування номера: XXXX XXXX XXXX XXXX
  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");

  // Формат для expiry: MM/YY
  const formatExpiry = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(?=\d)/g, "$1/");

  // Luhn algorithm
  const validateLuhn = (num) => {
    const digits = num.replace(/\s/g, "").split("").reverse().map((d) => parseInt(d, 10));
    if (digits.length < 12) return false; // занадто короткий
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let d = digits[i];
      if (i % 2 === 1) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
    }
    return sum % 10 === 0;
  };

  // Визначити тип картки за першим числом (дуже базово)
  const cardType = useMemo(() => {
    const raw = cardNumber.replace(/\s/g, "");
    if (/^4/.test(raw)) return "visa";
    if (/^5[1-5]/.test(raw)) return "mastercard";
    if (/^62|^81|^6/.test(raw)) return "union" ; // загальна перевірка
    return "unknown";
  }, [cardNumber]);

  // Перевірки полів
  const validateAll = () => {
    const rawNumber = cardNumber.replace(/\s/g, "");
    if (rawNumber.length < 12) {
      setError("Номер картки занадто короткий");
      return false;
    }
    if (!validateLuhn(cardNumber)) {
      setError("Невірний номер картки");
      return false;
    }
    // expiry MM/YY і не в минулому
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setError("Невірний термін дії (формат MM/YY)");
      return false;
    }
    // перевірка чи не минув термін
    const [mmStr, yyStr] = expiry.split("/");
    const mm = parseInt(mmStr, 10);
    const yy = parseInt(yyStr, 10);
    // поточний місяць/рік (2-digit)
    const now = new Date();
    const currentYY = now.getFullYear() % 100;
    const currentMM = now.getMonth() + 1;
    if (yy < currentYY || (yy === currentYY && mm < currentMM)) {
      setError("Термін дії картки минув");
      return false;
    }
    // cvv 3 цифри
    if (!/^\d{3}$/.test(cvv)) {
      setError("CVV повинен містити 3 цифри");
      return false;
    }
    // ім'я
    if (!name.trim()) {
      setError("Введіть ім'я власника картки");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    // Демо-імітація оплати
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // у реальній системі тут відправляли б токен/інформацію на бекенд
      alert("Оплата пройшла успішно (демо)");
      onSuccess && onSuccess();
      // очистити поля
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setName("");
    }, 900);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
        Оплата карткою
      </h3>

      <div className="mb-4">
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg p-3 relative border">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-gray-500">Картка</div>
              <div className="text-base font-mono text-gray-800 dark:text-gray-100">
                {cardNumber || "XXXX XXXX XXXX XXXX"}
              </div>
            </div>

            <div className="text-2xl text-gray-600 dark:text-gray-200">
              {cardType === "visa" ? (
                <FaCcVisa className="text-blue-600" />
              ) : cardType === "mastercard" ? (
                <FaCcMastercard className="text-red-500" />
              ) : (
                <FaCreditCard />
              )}
            </div>
          </div>

          <div className="flex justify-between mt-3 text-sm text-gray-500">
            <div>{expiry || "MM/YY"}</div>
            <div>{name || "CARDHOLDER NAME"}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Номер картки</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm mb-1">Термін дії (MM/YY)</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength={5}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
            />
          </div>

          <div style={{ width: "110px" }}>
            <label className="block text-sm mb-1">CVV</label>
            <input
              type="password"
              inputMode="numeric"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="123"
              autoComplete="cc-csc"
              maxLength={3}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Ім'я на картці</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="IVAN PETRENKO"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700"
          />
        </div>

        {amount !== null && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Сума до оплати: <strong>{amount} ₴</strong>
          </div>
        )}

        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-60 transition"
        >
          {loading ? "Обробка..." : "Сплатити"}
        </button>
      </form>
    </div>
  );
}