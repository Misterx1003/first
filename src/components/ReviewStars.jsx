function ReviewStars({ value, onChange, readonly = false }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: readonly ? "default" : "pointer",
            color: star <= value ? "gold" : "#ccc",
            fontSize: 20,
          }}
          onClick={() => !readonly && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default ReviewStars;