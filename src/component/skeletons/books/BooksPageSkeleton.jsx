import Skeleton from "../../ui/Skeleton";

export default function BooksPageSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">

      {/* HERO */}
      <div className="w-full h-[200px] md:h-[300px] bg-gray-300 flex items-center justify-center">
        <Skeleton className="h-10 w-1/3 rounded-md" />
      </div>

      <div className="flex flex-col md:flex-row w-full flex-1">

        {/* SIDEBAR */}
        <aside className="w-full md:w-1/4 p-5 space-y-4">
          <Skeleton className="h-6 w-1/2" />

          <div className="space-y-3 mt-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <main className="w-full md:w-3/4 p-5 flex flex-col gap-6">

          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-md">
            <Skeleton className="h-4 w-full" />
          </div>

          {/* GRID BOOKS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="bg-white p-3 rounded-lg shadow space-y-3">

                <Skeleton className="h-40 w-full rounded" />

                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />

                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>

              </div>
            ))}

          </div>

        </main>

      </div>
    </div>
  );
}