import { useEffect, useState, useCallback } from "react";
import ReviewItem from "./ReviewItem";
import AddReview from "./AddReview";
import toast from "react-hot-toast";

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    if (!productId) {
      setReviews([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/reviews/${productId}`
      );

      if (!res.ok) {
        throw new Error(`Помилка сервера: ${res.status}`);
      }

      const data = await res.json();

      // Захист від неправильного формату відповіді
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Помилка завантаження відгуків:", error);

      // Не ламаємо всю сторінку через відгуки
      setReviews([]);

      // Не показуємо toast при кожному автоматичному завантаженні,
      // щоб користувача не дратувати
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleAddReview = (review) => {
    setReviews((prev) => [review, ...prev]);
    toast.success("Відгук успішно додано!");
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-3">
        Відгуки
      </h3>

      <AddReview
        productId={productId}
        onAdd={handleAddReview}
      />

      {loading && (
        <p className="text-gray-500">
          Завантаження відгуків...
        </p>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-gray-500">
          Відгуків поки немає
        </p>
      )}

      {!loading &&
        reviews.map((r) => (
          <ReviewItem
            key={r._id || r.id}
            review={r}
          />
        ))}
    </div>
  );
}

export default Reviews;