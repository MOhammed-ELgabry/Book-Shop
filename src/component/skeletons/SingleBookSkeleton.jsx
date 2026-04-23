export default function SingleBookSkeleton() {
  return (
    <div className="p-6 max-w-6xl mx-auto animate-pulse">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Image */}
        <div className="w-full h-[400px] bg-gray-300 rounded-2xl"></div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>

          <div className="h-6 w-1/4 bg-gray-300 rounded mt-2"></div>

          <div className="h-4 w-1/3 bg-gray-200 rounded mt-4"></div>
          <div className="h-5 w-1/4 bg-gray-300 rounded"></div>

          <div className="flex gap-4 mt-4">
            <div className="w-16 h-10 bg-gray-300 rounded"></div>
            <div className="w-32 h-10 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-6">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
