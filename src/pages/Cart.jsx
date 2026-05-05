import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, clearCart }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = async () => {
    if (!user) {
      toast.error("Увійдіть, щоб оформити замовлення");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Замовлення прийнято ✅");
      clearCart();
    } catch (err) {
      toast.error("Помилка оформлення");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Кошик</h2>

      {cartItems.map((item) => (
        <div key={item.productId} className="mb-2">
          {item.name} × {item.qty} — {item.price} ₴
        </div>
      ))}

      <button
        onClick={checkoutHandler}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded"
      >
        Оформити замовлення
      </button>
    </div>
  );
}