export default function AboutHeroSkeleton() {
  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-5">
        <div className="h-10 w-3/4 mx-auto bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-5/6 mx-auto bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-2/3 mx-auto bg-gray-300 animate-pulse rounded"></div>
      </div>
    </div>
  );
}