import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/types';
import { videoService } from '@/services/videoService';
import { formatViews, formatDate } from '@/utils/format';
import Loading from '@/components/Loading';

const VioletEvergardenPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const violetVideos = await videoService.getVioletEvergardenVideos();
        setVideos(violetVideos);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError('加载视频失败');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error || videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-800 mb-4">{error || '暂无视频'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  // 使用第一个视频的缩略图作为横幅
  const bannerImage = videos[0]?.thumbnailUrl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-50">
      <div className="relative h-[60vh] bg-purple-900 shadow-xl">
        <Image
          src={bannerImage}
          alt="Violet Evergarden"
          fill
          priority
          className="object-cover opacity-50 transition-opacity duration-700 hover:opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-purple-900/30 to-purple-900/60">
          <div className="text-center text-white backdrop-blur-sm bg-purple-900/20 p-8 rounded-xl border border-white/10">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-wide text-shadow-lg">
              紫罗兰永恒花园
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 leading-relaxed">
              「爱」是什么？为了理解这个词的含义，少女踏上了漫长的旅程...
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              href={`/watch/${video.id}`}
              key={video.id}
              className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100"
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-serif font-medium text-purple-900 mb-3 group-hover:text-purple-700 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-purple-600/80">
                  <span>{formatViews(video.views)} 次观看</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(video.uploadDate)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-purple-50 to-white rounded-2xl p-10 shadow-lg border border-purple-100/50">
          <h2 className="text-3xl font-bold text-purple-900 mb-8 font-serif tracking-wide">
            关于作品
          </h2>
          <div className="prose prose-purple prose-lg max-w-none">
            <p className="leading-relaxed">
              《紫罗兰永恒花园》是由京都动画制作的动画作品，改编自晓佳奈创作的轻小说。故事讲述了曾是军人的少女薇尔莉特·伊芙加登在战后成为「自动手记人偶」的故事。
            </p>
            <p className="mt-6 leading-relaxed">
              在这个「自动手记人偶」代写书信的时代，薇尔莉特通过为他人书写心意的过程，逐渐理解人类的情感与「爱」的真正含义。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VioletEvergardenPage;