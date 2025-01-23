import React from 'react';
import { Video } from '@/types';
import { formatViews, formatDate } from '@/utils/format';

interface VideoInfoProps {
  video: Video;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  // 根据频道名生成一个独特的渐变色
  const getGradientColors = () => {
    const colors = {
      'Kyoto Animation': 'from-violet-400 to-purple-500',
      'MAPPA': 'from-blue-400 to-indigo-500',
      'ufotable': 'from-green-400 to-emerald-500',
      'default': 'from-gray-400 to-gray-500'
    };
    return colors[video.userId as keyof typeof colors] || colors.default;
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          {/* 渐变色头像 */}
          <div className={`w-12 h-12 rounded-full flex-shrink-0 bg-gradient-to-br ${getGradientColors()} animate-gradient`} />
          <div className="ml-4">
            <p className="font-semibold text-gray-900">{video.userId}</p>
            <p className="text-sm text-gray-600">100万订阅</p>
          </div>
          <button className="ml-6 px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors">
            订阅
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <span className="text-lg">👍</span>
              <span className="font-medium">{formatViews(video.likes)}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <span className="text-lg">👎</span>
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
            <span>分享</span>
          </button>
        </div>
      </div>
      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">{formatViews(video.views)}次观看</span>
          <span className="mx-2">•</span>
          <span>{formatDate(video.uploadDate)}</span>
        </div>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoInfo;