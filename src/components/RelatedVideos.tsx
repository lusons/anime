import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';
import { formatViews, formatDate } from '@/utils/format';

interface RelatedVideosProps {
  videos: Video[];
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos }) => {
  return (
    <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
      {videos.map((video) => (
        <Link href={`/watch/${video.id}`} key={video.id} className="block">
          <div className="flex space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="relative w-40 h-24 flex-shrink-0">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-2 text-gray-900 group-hover:text-blue-600">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{video.userId}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {formatViews(video.views)}次观看 · {formatDate(video.uploadDate)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedVideos;