import Skeleton from "../../ui/Skeleton";

export default function AboutContactSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#3f364c] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left side (form) */}
        <div className="flex flex-col gap-6">

          {/* Title */}
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-10 w-2/3" />

          {/* paragraph */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* form inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          <Skeleton className="h-32 w-full" />

          <Skeleton className="h-12 w-40" />

        </div>

        {/* Right side (contact info) */}
        <div className="flex flex-col gap-8 justify-center">

          {/* phone */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* email */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* address */}
          <div className="flex items-start gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}