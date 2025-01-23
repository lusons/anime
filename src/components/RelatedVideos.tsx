import React from 'react';

interface RelatedVideosProps {
  currentVideoId: string;
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ currentVideoId }) => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="flex space-x-2">
          <div className="w-40 h-24 bg-gray-200"></div>
          <div>
            <h3 className="font-medium">相关视频标题 {index}</h3>
            <p className="text-sm text-gray-500">频道名称</p>
            <p className="text-sm text-gray-500">10万次观看 · 1天前</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedVideos; 