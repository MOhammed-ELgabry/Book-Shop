export default function BooksListSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      
      {[1,2,3,4,5,6].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start"
        >
          
          {/* Image */}
          <div className="w-40 h-56 bg-gray-200 rounded-lg"></div>

          {/* Content */}
          <div className="flex flex-col flex-1 gap-4 w-full">
            
            {/* Title + badge */}
            <div className="flex justify-between items-center">
              <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>

            {/* Rating */}
            <div className="h-4 w-32 bg-gray-200 rounded"></div>

            {/* Author + Category */}
            <div className="flex gap-12">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Price + buttons */}
          <div className="flex flex-col items-end gap-4">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>

            <div className="flex gap-3">
              <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
              <div className="h-10 w-12 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-3 mt-6">
        {[1,2,3,4].map((_, i) => (
          <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}