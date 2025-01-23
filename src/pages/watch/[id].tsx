import React from 'react';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import CommentSection from '@/components/CommentSection';
import RelatedVideos from '@/components/RelatedVideos';

const WatchPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-8">
        <VideoPlayer videoId={id as string} />
        <VideoInfo videoId={id as string} />
        <CommentSection videoId={id as string} />
      </div>
      <div className="col-span-4">
        <RelatedVideos currentVideoId={id as string} />
      </div>
    </div>
  );
};

export default WatchPage; 