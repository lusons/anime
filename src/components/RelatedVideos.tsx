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
    <div className="space-y-4">
      {videos.map((video) => (
        <Link href={`/watch/${video.id}`} key={video.id}>
          <div className="flex space-x-2 group">
            <div className="relative w-40 h-24">
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium line-clamp-2 group-hover:text-blue-600">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500">{video.userId}</p>
              <p className="text-sm text-gray-500">
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