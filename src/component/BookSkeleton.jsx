// src/components/BookSkeleton.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

function BookSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4 w-40 bg-white rounded shadow">
      {/* غلاف الكتاب */}
      <Skeleton height={160} width={120} className="mb-2" />
      {/* عنوان الكتاب */}
      <Skeleton height={20} width={100} />
      {/* اسم المؤلف */}
      <Skeleton height={15} width={80} />
    </div>
  );
}

export default BookSkeleton;