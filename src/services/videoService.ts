import { Video } from '@/types';
import { animeAPI, AnimeResult } from './animeAPI';

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

const animeVideos: Video[] = [
  {
    id: 'jjk-1',
    title: '咒術迴戰 第二季 渋谷事変篇 PV',
    description: '在渋谷街頭，宿儺與五条悟展開了驚天動地的對決...',
    thumbnailUrl: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=O2qKmZh8M7E',
    views: 2500000,
    likes: 180000,
    uploadDate: new Date('2024-01-15'),
    userId: 'MAPPA'
  },
  {
    id: 'jjk-2',
    title: '咒術迴戰 第一季 精彩片段：两面宿儺登场',
    description: '虎杖悠仁吞下詛咒之指後，兩面宿儺首次現身...',
    thumbnailUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=A_EKCNcbNxE',
    views: 1800000,
    likes: 150000,
    uploadDate: new Date('2024-02-20'),
    userId: 'MAPPA'
  },
  {
    id: 'kny-1',
    title: '鬼滅之刃 刀匠村篇 PV',
    description: '炭治郎一行人前往刀匠村，揭開日輪刀的秘密...',
    thumbnailUrl: 'https://cdn.myanimelist.net/images/anime/1908/135431.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=a8kAuqJCrM8',
    views: 2200000,
    likes: 170000,
    uploadDate: new Date('2024-03-01'),
    userId: 'ufotable'
  },
  {
    id: 'kny-2',
    title: '鬼滅之刃 無限列車篇 精彩片段：炎柱煉獄杏壽郎VS上弦之參',
    description: '煉獄杏壽郎在無限列車上與上弦之參展開激戰...',
    thumbnailUrl: 'https://cdn.myanimelist.net/images/anime/1065/118763.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=BFVxGRYU0Go',
    views: 3000000,
    likes: 250000,
    uploadDate: new Date('2024-02-10'),
    userId: 'ufotable'
  },
  {
    id: 'op-1',
    title: 'ONE PIECE 新世界篇 精選戰鬥場面',
    description: '路飛與凱多的最終對決，震撼展開...',
    thumbnailUrl: 'https://cdn.myanimelist.net/images/anime/1607/117271.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=AqQv2acNGJY',
    views: 1500000,
    likes: 120000,
    uploadDate: new Date('2024-03-10'),
    userId: 'Toei'
  }
];

// 修改额外视频的缩略图来源，使用实际存在的动漫图片
const popularAnimeImages = [
  '138022', // 咒術迴戰
  '109222', // 咒術迴戰
  '135431', // 鬼滅之刃
  '118763', // 鬼滅之刃
  '117271', // ONE PIECE
  '131592', // SPY×FAMILY
  '134401', // 進擊的巨人
  '125996', // 排球少年
  '131317', // 藍色監獄
  '136583', // 葬送的芙莉蓮
];

const additionalAnimeVideos = Array.from({ length: 15 }, (_, i) => ({
  id: `anime-${i + 6}`,
  title: `动漫精选片段 ${i + 1}`,
  description: '精彩动漫场景剪辑...',
  thumbnailUrl: `https://cdn.myanimelist.net/images/anime/${1000 + Math.floor(Math.random() * 1000)}/${popularAnimeImages[i % popularAnimeImages.length]}.jpg`,
  videoUrl: animeVideos[i % animeVideos.length].videoUrl,
  views: Math.floor(Math.random() * 1000000) + 500000,
  likes: Math.floor(Math.random() * 100000) + 50000,
  uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  userId: ['MAPPA', 'ufotable', 'Toei', 'A-1 Pictures', 'Bones'][Math.floor(Math.random() * 5)]
}));

// 合并所有视频
const allVideos = [...mockVideos, ...additionalVideos, ...animeVideos, ...additionalAnimeVideos];

class VideoService {
  private videos: Video[] = [];
  private initialized = false;

  private convertAnimeToVideo(anime: AnimeResult): Video {
    return {
      id: `anime-${anime.mal_id}`,
      title: anime.title,
      description: anime.synopsis,
      thumbnailUrl: anime.images.jpg.large_image_url,
      videoUrl: anime.trailer?.url || `https://www.youtube.com/watch?v=${anime.trailer?.youtube_id}`,
      views: anime.members,
      likes: Math.floor(anime.members * (anime.score / 10)),
      uploadDate: new Date(anime.aired.from),
      userId: anime.studios[0]?.name || 'Unknown Studio'
    };
  }

  private async initialize() {
    if (this.initialized) return;

    try {
      // 获取当季动漫
      const seasonalAnime = await animeAPI.getSeasonalAnime();
      const seasonalVideos = seasonalAnime.map(this.convertAnimeToVideo);

      // 获取热门动漫
      const topAnime = await animeAPI.getAnimeByType('tv');
      const topVideos = topAnime.map(this.convertAnimeToVideo);

      this.videos = [...seasonalVideos, ...topVideos];
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize video service:', error);
      // 使用备用数据
      this.videos = [/* 你之前的静态数据作为备用 */];
    }
  }

  async getVideoById(id: string) {
    await this.initialize();
    return this.videos.find(video => video.id === id);
  }

  async getRelatedVideos(currentVideoId: string) {
    await this.initialize();
    return this.videos
      .filter(video => video.id !== currentVideoId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  }

  async getTrendingVideos() {
    await this.initialize();
    return this.videos
      .sort((a, b) => b.views - a.views)
      .slice(0, 12);
  }

  async searchVideos(query: string) {
    try {
      const results = await animeAPI.searchAnime(query);
      return results.map(this.convertAnimeToVideo);
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }

  async getVideosByStudio(studio: string) {
    await this.initialize();
    return this.videos.filter(video => video.userId === studio);
  }
}

export const videoService = new VideoService(); 