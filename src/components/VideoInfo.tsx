import React from 'react';

interface VideoInfoProps {
  videoId: string;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ videoId }) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">视频标题</h1>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="ml-3">
            <p className="font-medium">频道名称</p>
            <p className="text-sm text-gray-500">100万订阅</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded-full">
            订阅
          </button>
          <button className="flex items-center space-x-1">
            <span>👍</span>
            <span>10万</span>
          </button>
          <button className="flex items-center space-x-1">
            <span>👎</span>
          </button>
          <button>分享</button>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo; 