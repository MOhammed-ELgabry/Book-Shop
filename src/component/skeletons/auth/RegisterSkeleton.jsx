export default function RegisterSkeleton() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6 animate-pulse">
        
        {/* Title */}
        <div className="h-6 w-1/2 bg-gray-200 rounded"></div>

        {/* First + Last Name */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-300 rounded-2xl"></div>

        {/* Footer text */}
        <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
