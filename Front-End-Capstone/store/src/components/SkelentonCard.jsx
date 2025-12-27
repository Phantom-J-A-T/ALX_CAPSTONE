function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4 animate-pulse">
      {/* Image Placeholder */}
      <div className="bg-gray-200 aspect-[4/_5] w-full rounded-xl" />
      
      {/* Text Lines */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>

      {/* Button Placeholder */}
      <div className="h-12 bg-gray-100 rounded-xl w-full mt-2" />
    </div>
  );
}

export default SkeletonCard;