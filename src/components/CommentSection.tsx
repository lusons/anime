import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment } from '@/types';
import { formatTimeAgo } from '@/utils/format';

interface CommentSectionProps {
  videoId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        // 从 videoId (例如 "anime-33352") 中提取 MAL ID
        const malId = videoId.replace('anime-', '');
        
        // 添加延迟以遵守 API 限制
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetch(`https://api.jikan.moe/v4/anime/${malId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        
        // 确保 data.data 存在且是数组
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid response format');
        }

        // 转换评论数据格式
        const formattedComments: Comment[] = data.data
          .slice(0, 20) // 限制评论数量
          .map((review: any) => ({
            id: review.mal_id.toString(),
            content: review.review.slice(0, 300) + (review.review.length > 300 ? '...' : ''), // 限制评论长度
            userId: review.user.username,
            userAvatar: review.user.images?.jpg?.image_url,
            videoId: videoId,
            likes: review.reactions?.overall || 0,
            createdAt: new Date(review.date),
            score: review.score,
            reactions: {
              overall: review.reactions?.overall || 0,
              nice: review.reactions?.nice || 0,
              love_it: review.reactions?.love_it || 0,
              funny: review.reactions?.funny || 0,
              confusing: review.reactions?.confusing || 0,
              informative: review.reactions?.informative || 0,
              well_written: review.reactions?.well_written || 0,
              creative: review.reactions?.creative || 0
            }
          }));

        setComments(formattedComments);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
        setError('加载评论失败');
        // 使用模拟数据作为备份
        setComments([
          {
            id: '1',
            content: '这部作品真的很感人，让我想起了自己的经历...',
            userId: '薇尔莉特',
            videoId: videoId,
            likes: 1234,
            createdAt: new Date(),
            score: 10
          },
          {
            id: '2',
            content: '每次看到这里都会热泪盈眶',
            userId: '吉尔伯特',
            videoId: videoId,
            likes: 856,
            createdAt: new Date(),
            score: 9
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">评论 ({comments.length})</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-purple-600 hover:text-purple-700"
        >
          排序
        </motion.button>
      </div>

      {/* 评论输入框 */}
      <motion.div 
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={`w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-500 animate-gradient`} />
        <div className="flex-1">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="添加评论..."
            className="w-full p-2 border-b border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            onClick={() => setIsExpanded(true)}
          />
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-end space-x-2 mt-2"
              >
                <button 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsExpanded(false)}
                >
                  取消
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
                  评论
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 评论列表 */}
      <motion.div 
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {loading ? (
          // 加载状态
          [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex space-x-4 animate-pulse"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </motion.div>
          ))
        ) : error ? (
          // 错误状态
          <div className="text-center text-gray-500 py-8">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-purple-600 hover:text-purple-700"
            >
              重试
            </button>
          </div>
        ) : (
          // 评论列表
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
              className="flex space-x-4 group"
            >
              <div className={`w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-500 animate-gradient overflow-hidden`}>
                {comment.userAvatar && (
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.userId}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{comment.userId}</span>
                  <span className="text-sm text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                  {comment.score && (
                    <span className="text-sm text-yellow-500">★ {comment.score}</span>
                  )}
                </div>
                <p className="mt-1 text-gray-800">{comment.content}</p>
                <div className="mt-2 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                  >
                    <span>👍</span>
                    <span>{comment.likes}</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    👎
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    回复
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default CommentSection; 