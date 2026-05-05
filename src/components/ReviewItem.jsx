import React from "react";

export default function ReviewItem({ review, canEdit, onDelete }) {
  return (
    <div
      className={`p-3 border rounded mb-3 transition ${
        review.optimistic ? "opacity-60 animate-pulse" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <b>{review.author}</b>
        <span className="text-sm text-yellow-500">
          {"⭐".repeat(review.rating)}
        </span>
      </div>

      <p className="mt-1">{review.comment}</p>

      {canEdit && !review.optimistic && (
        <button
          onClick={() => onDelete(review._id)}
          className="text-red-500 text-sm mt-2"
        >
          Видалити
        </button>
      )}
    </div>
  );
}