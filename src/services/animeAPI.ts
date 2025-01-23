import axios from 'axios';

// Jikan API (MyAnimeList 非官方 API)
const BASE_URL = 'https://api.jikan.moe/v4';

export interface AnimeResult {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    }
  };
  synopsis: string;
  score: number;
  members: number;
  aired: {
    from: string;
  };
  studios: {
    name: string;
  }[];
  trailer: {
    youtube_id: string;
    url: string;
  };
}

export const animeAPI = {
  // 获取季度热门动漫
  getSeasonalAnime: async () => {
    const response = await axios.get(`${BASE_URL}/seasons/now`);
    return response.data.data as AnimeResult[];
  },

  // 获取特定动漫的详情
  getAnimeById: async (id: number) => {
    const response = await axios.get(`${BASE_URL}/anime/${id}`);
    return response.data.data as AnimeResult;
  },

  // 搜索动漫
  searchAnime: async (query: string) => {
    const response = await axios.get(`${BASE_URL}/anime?q=${query}&sfw=true`);
    return response.data.data as AnimeResult[];
  },

  // 获取特定类型的动漫
  getAnimeByType: async (type: string) => {
    const response = await axios.get(`${BASE_URL}/top/anime?type=${type}`);
    return response.data.data as AnimeResult[];
  }
}; 