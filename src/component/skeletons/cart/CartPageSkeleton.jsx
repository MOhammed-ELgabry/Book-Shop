import Skeleton from "../../ui/Skeleton";

export default function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      {/* HERO */}
      <Skeleton className="w-full h-48 rounded-xl mb-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT - CART ITEMS */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow flex gap-6">
              
              {/* IMAGE */}
              <Skeleton className="w-24 h-32 rounded-lg" />

              {/* INFO */}
              <div className="flex-1 flex flex-col gap-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />

                {/* QUANTITY */}
                <div className="flex gap-3 mt-2">
                  <Skeleton className="w-8 h-8 rounded" />
                  <Skeleton className="w-6 h-6" />
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </div>

              {/* PRICE */}
              <div className="flex flex-col items-end gap-3">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>

      </div>
    </div>
  );
}