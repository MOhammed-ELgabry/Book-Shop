import Skeleton from "../../ui/Skeleton";

export default function AboutMissionSkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">

      {[1,2,3].map((item) => (
        <div
          key={item}
          className="p-4 flex flex-col gap-6 shadow rounded bg-white"
        >
          {/* Title */}
          <Skeleton className="h-6 w-2/3" />

          {/* Text lines */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Button */}
          <Skeleton className="h-10 w-32 mt-2 rounded-md" />
        </div>
      ))}

    </div>
  );
}