const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 p-4 rounded shadow">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
