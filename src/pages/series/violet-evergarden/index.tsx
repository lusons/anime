import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Video } from '@/types';

const violetEvergardenVideos: Video[] = [
  {
    id: 'ep1',
    title: '第1话「我爱你」与自动手记人偶',
    description: '在战争结束后，曾是军人的薇尔莉特·伊芙加登开始在CH邮政公司工作，并了解到「自动手记人偶」这一职业。',
    thumbnailUrl: 'https://via.placeholder.com/480x270.png?text=EP1',
    videoUrl: 'https://example.com/violet-evergarden/ep1',
    views: 1500000,
    uploadDate: '2018-01-11',
    userId: 'KyoaniOfficial'
  },
  {
    id: 'ep2',
    title: '第2话 离别之时所需之物',
    description: '薇尔莉特开始以见习生的身份，在自动手记人偶养成学校学习。',
    thumbnailUrl: 'https://via.placeholder.com/480x270.png?text=EP2',
    videoUrl: 'https://example.com/violet-evergarden/ep2',
    views: 1200000,
    uploadDate: '2018-01-18',
    userId: 'KyoaniOfficial'
  },
];

const VioletEvergardenPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-purple-800 mb-4"
        >
          紫罗兰永恒花园
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-4"
        >
          在战后开始新生活的前军人薇尔莉特·伊芙加登，为了理解少佐给她的最后话语「我爱你」的含义，
          开始以自动手记人偶的身份工作，在替他人传达心意的过程中，逐渐理解人类的感情。
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {violetEvergardenVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            <Link href={`/watch/${video.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm">{video.description}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(video.uploadDate).toLocaleDateString('zh-CN')}</span>
                    <span>{video.views.toLocaleString()}次观看</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VioletEvergardenPage;