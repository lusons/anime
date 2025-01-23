import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Video } from '@/types';
import { videoService } from '@/services/videoService';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import CommentSection from '@/components/CommentSection';
import RelatedVideos from '@/components/RelatedVideos';

const WatchPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (id) {
      const videoData = videoService.getVideoById(id as string);
      if (videoData) {
        setVideo(videoData);
        const related = videoService.getRelatedVideos(videoData.id);
        setRelatedVideos(related);
      }
    }
  }, [id]);

  if (!video) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 lg:col-span-8">
        <VideoPlayer videoId={video.id} videoUrl={video.videoUrl} />
        <VideoInfo video={video} />
        <CommentSection videoId={video.id} />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <RelatedVideos videos={relatedVideos} />
      </div>
    </div>
  );
};

export default WatchPage; 