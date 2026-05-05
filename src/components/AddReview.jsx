import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ReviewStars from "./ReviewStars";
import { toast } from "react-hot-toast";

export default function AddReview({ productId, onAdd }) {
  const { user, token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <p className="text-red-500 mt-4">Увійдіть, щоб залишити відгук</p>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Напишіть коментар");
      return;
    }

    const optimisticReview = {
      _id: Date.now(),
      userName: user.email,
      rating,
      comment,
      createdAt: new Date(),
    };

    // ⚡ Optimistic UI
    onAdd(optimisticReview);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/reviews",
        { productId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
      setRating(5);
      toast.success("Відгук додано ✅");
    } catch (err) {
      toast.error("Ви вже залишали відгук");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="mt-6">
      <ReviewStars value={rating} onChange={setRating} />

      <textarea
        className="w-full border p-2 mt-2 rounded"
        placeholder="Ваш відгук..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <button
        disabled={loading}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Надсилання..." : "Надіслати"}
      </button>
    </form>
  );
}