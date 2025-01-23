import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';
import { videoService } from '@/services/videoService';
import { formatViews, formatDate } from '@/utils/format';

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const trendingVideos = videoService.getTrendingVideos();
    setVideos(trendingVideos);
  }, []);

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
                <h3 className="font-medium line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500">频道名称</p>
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