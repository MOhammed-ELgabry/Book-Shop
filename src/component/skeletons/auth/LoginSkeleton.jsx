export default function LoginSkeleton() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6 animate-pulse">
        
        {/* Title */}
        <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded"></div>

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

        {/* Button */}
        <div className="h-10 w-full bg-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );
}