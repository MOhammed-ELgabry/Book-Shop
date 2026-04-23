import Skeleton from "../../ui/Skeleton";

export default function AboutGridSkeleton() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {Array(4).fill(0).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-start gap-4 p-4 shadow rounded bg-white"
        >

          {/* Icon placeholder */}
          <Skeleton className="h-10 w-10 rounded-full" />

          {/* Title */}
          <Skeleton className="h-5 w-2/3" />

          {/* Description lines */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

        </div>
      ))}

    </div>
  );
}