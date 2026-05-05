import { useEffect, useState, useCallback } from "react";
import ReviewItem from "./ReviewItem";
import AddReview from "./AddReview";

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);

  const loadReviews = useCallback(async () => {
    const res = await fetch(`http://localhost:5000/api/reviews/${productId}`);
    const data = await res.json();
    setReviews(data);
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold mb-3">Відгуки</h3>

      <AddReview
        productId={productId}
        onAdd={(r) => setReviews((prev) => [r, ...prev])}
      />

      {reviews.length === 0 && <p>Відгуків поки немає</p>}

      {reviews.map((r) => (
        <ReviewItem key={r._id} review={r} />
      ))}
    </div>
  );
}

export default Reviews;