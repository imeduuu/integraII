import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width = 'w-full', height = 'h-4', rounded = true, className = '' }) => {
  const border = rounded ? 'rounded' : '';
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${width} ${height} ${border} ${className}`} />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-white dark:bg-gray-900 rounded-xl shadow p-6 w-72 flex flex-col items-center gap-3 ${className}`}>
      <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-24 h-24" />
      <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-40 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
      <div className="w-full mt-3">
        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 6 }) => {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
      {items.map((_, i) => (
        // key is fine for static skeletons
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Skeleton;
