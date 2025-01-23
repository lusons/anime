export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  likes: number;
  uploadDate: Date;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  subscribers: number;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userAvatar?: string;
  videoId: string;
  likes: number;
  createdAt: Date;
  score?: number;
  reactions?: {
    overall: number;
    nice: number;
    love_it: number;
    funny: number;
    confusing: number;
    informative: number;
    well_written: number;
    creative: number;
  };
} 