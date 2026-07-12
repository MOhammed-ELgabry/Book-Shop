export default function BooksListSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Books Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="relative aspect-[3/4] bg-slate-200"></div>

            {/* Content Placeholder */}
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex-1">
                {/* Category Badge Placeholder */}
                <div className="h-4 w-20 bg-slate-100 rounded-lg mb-3"></div>
                {/* Title Placeholder */}
                <div className="h-6 w-full bg-slate-200 rounded-lg mb-2"></div>
                <div className="h-6 w-2/3 bg-slate-200 rounded-lg mb-3"></div>
                {/* Author Placeholder */}
                <div className="h-4 w-1/2 bg-slate-100 rounded-lg"></div>
              </div>

              {/* Price & Button Placeholder */}
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50">
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-10 bg-slate-100 rounded"></div>
                  <div className="h-7 w-16 bg-slate-200 rounded-lg"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center gap-2 pt-10 border-t border-slate-100">
        <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
        <div className="flex items-center gap-2 px-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  );
}