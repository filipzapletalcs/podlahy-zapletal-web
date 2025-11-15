import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'image' | 'gallery';
  count?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  count = 1,
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className={`animate-pulse space-y-3 ${className}`}>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        );

      case 'image':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="bg-gray-200 rounded-lg w-full h-full"></div>
          </div>
        );

      case 'gallery':
        return (
          <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
            <div className="animate-pulse">
              {/* Image skeleton */}
              <div className="bg-gray-200 h-64 w-full"></div>

              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );

      case 'card':
      default:
        return (
          <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

// Preset for gallery grid
export const GallerySkeletonGrid: React.FC<{ count?: number }> = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => {
        // Same height pattern as gallery
        const patterns = ['h-64', 'h-80', 'h-64', 'h-96', 'h-64', 'h-80', 'h-64', 'h-64', 'h-80', 'h-64', 'h-96', 'h-80'];
        const height = patterns[index % patterns.length];

        return (
          <div key={index} className={`relative overflow-hidden rounded-xl bg-gray-200 ${height} animate-pulse`}>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        );
      })}
    </div>
  );
};
