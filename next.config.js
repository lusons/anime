/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com'
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com'
      }
    ]
  },
  // 如果需要使用外部视频源，也需要配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 