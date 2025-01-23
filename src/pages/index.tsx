import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';
import { videoService } from '@/services/videoService';
import { formatViews, formatDate } from '@/utils/format';
import VideoGridSkeleton from '@/components/VideoGridSkeleton';

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const trendingVideos = await videoService.getTrendingVideos();
        setVideos(trendingVideos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setError('加载视频失败');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <VideoGridSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-xl text-gray-800">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <Link href={`/watch/${video.id}`} key={video.id}>
          <div className="cursor-pointer group">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="mt-2 flex">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div className="ml-2">
                <h3 className="font-medium line-clamp-2 group-hover:text-blue-600">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500">{video.userId}</p>
                <p className="text-sm text-gray-500">
                  {formatViews(video.views)}次观看 · {formatDate(video.uploadDate)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage; 