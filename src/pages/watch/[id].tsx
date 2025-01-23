import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Video } from '@/types';
import { videoService } from '@/services/videoService';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import CommentSection from '@/components/CommentSection';
import RelatedVideos from '@/components/RelatedVideos';
import Loading from '@/components/Loading';

const WatchPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const videoData = await videoService.getVideoById(id as string);
        if (!videoData) {
          setError('视频未找到');
          return;
        }
        
        setVideo(videoData);
        const related = await videoService.getRelatedVideos(videoData.id);
        setRelatedVideos(related);
      } catch (err) {
        setError('加载视频时出错');
        console.error('Error fetching video:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !video) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="text-xl text-gray-800">{error || '视频未找到'}</div>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
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