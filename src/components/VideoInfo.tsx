import React from 'react';
import { Video } from '@/types';
import { formatViews, formatDate } from '@/utils/format';

interface VideoInfoProps {
  video: Video;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">{video.title}</h1>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="ml-3">
            <p className="font-medium">频道名称</p>
            <p className="text-sm text-gray-500">100万订阅</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
            订阅
          </button>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <span>👍</span>
              <span>{formatViews(video.likes)}</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <span>👎</span>
            </button>
          </div>
          <button className="px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
            分享
          </button>
        </div>
      </div>
      <div className="mt-4 bg-gray-100 rounded-lg p-3">
        <div className="flex items-center text-sm text-gray-600">
          <span>{formatViews(video.views)}次观看</span>
          <span className="mx-1">•</span>
          <span>{formatDate(video.uploadDate)}</span>
        </div>
        <p className="mt-2 whitespace-pre-wrap">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoInfo; 