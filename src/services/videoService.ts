import { Video } from '@/types';

// 使用一些真实可播放的视频数据
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description: 'Big Buck Bunny 是一部由 Blender Foundation 制作的开源动画短片...',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    views: 150000,
    likes: 12000,
    uploadDate: new Date('2024-03-15'),
    userId: 'user1'
  },
  {
    id: '2',
    title: 'Elephant Dream',
    description: '第一部开源电影...',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Elephants_Dream_poster_1.jpg/800px-Elephants_Dream_poster_1.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    views: 120000,
    likes: 9000,
    uploadDate: new Date('2024-03-14'),
    userId: 'user2'
  },
  {
    id: '3',
    title: 'Sintel',
    description: 'Blender Foundation 的第三部开源电影...',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sintel_poster.jpg/800px-Sintel_poster.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    views: 180000,
    likes: 15000,
    uploadDate: new Date('2024-03-13'),
    userId: 'user3'
  },
  {
    id: '4',
    title: 'Tears of Steel',
    description: 'Blender Institute 制作的科幻短片...',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Tears_of_Steel_poster.jpg/800px-Tears_of_Steel_poster.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    views: 200000,
    likes: 18000,
    uploadDate: new Date('2024-03-12'),
    userId: 'user4'
  }
];

// 添加更多视频数据
const additionalVideos = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 5}`,
  title: `Sample Video ${i + 5}`,
  description: '这是一个示例视频...',
  thumbnailUrl: `https://picsum.photos/seed/${i + 5}/640/360`,
  // 循环使用上面的视频URL
  videoUrl: mockVideos[i % 4].videoUrl,
  views: Math.floor(Math.random() * 1000000),
  likes: Math.floor(Math.random() * 100000),
  uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  userId: `user${Math.floor(Math.random() * 10) + 1}`
}));

// 合并视频数据
const allVideos = [...mockVideos, ...additionalVideos];

export const videoService = {
  getVideoById: (id: string) => {
    return allVideos.find(video => video.id === id);
  },
  
  getRelatedVideos: (currentVideoId: string) => {
    return allVideos
      .filter(video => video.id !== currentVideoId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  },
  
  getTrendingVideos: () => {
    return allVideos
      .sort((a, b) => b.views - a.views)
      .slice(0, 12);
  },

  getRecentVideos: () => {
    return allVideos
      .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
      .slice(0, 12);
  },

  searchVideos: (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return allVideos
      .filter(video => 
        video.title.toLowerCase().includes(lowercaseQuery) ||
        video.description.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 20);
  }
}; 