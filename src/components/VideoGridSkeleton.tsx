import React from 'react';

const VideoGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* 视频缩略图骨架 */}
          <div className="aspect-video bg-gray-200 rounded-lg"></div>
          <div className="mt-2 flex space-x-2">
            {/* 头像骨架 */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              {/* 标题骨架 */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              {/* 视图数和时间骨架 */}
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGridSkeleton; 