import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
      <div className="bg-gray-300 dark:bg-gray-700 h-40 w-full rounded-xl mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
};

export default ProductSkeleton;