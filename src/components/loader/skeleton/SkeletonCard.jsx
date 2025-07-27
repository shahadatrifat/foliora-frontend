const SkeletonCard = () => {
  return (
    <div className="bg-white mt-20 dark:bg-[#111827] rounded-lg p-4 shadow animate-pulse w-full">
      {/* Book cover skeleton with 2:3 aspect ratio */}
      <div className="w-full aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>

      {/* Title skeleton */}
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>

      {/* Author skeleton */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>

      {/* Genre badges skeleton (3 small rectangles) */}
      <div className="flex gap-2">
        <div className="h-6 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-14 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
