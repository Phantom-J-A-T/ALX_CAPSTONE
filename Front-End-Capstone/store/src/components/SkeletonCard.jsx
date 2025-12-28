// src/components/SkeletonCard.jsx
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-full animate-pulse">
      {/* Image Box Placeholder */}
      <div className="aspect-square bg-gray-200" />

      <div className="p-4 flex flex-col grow space-y-4">
        {/* Title Placeholder */}
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        
        {/* Price Placeholder */}
        <div className="h-6 bg-gray-200 rounded-md w-1/4" />

        {/* Quantity Box Placeholder */}
        <div className="mt-auto pt-4">
          <div className="h-10 bg-gray-100 rounded-lg w-full mb-4" />
          {/* Button Placeholder */}
          <div className="h-12 bg-gray-200 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}
export default SkeletonCard;