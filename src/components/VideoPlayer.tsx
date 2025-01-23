import React from 'react';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 bg-black">
      <div className="w-full h-full flex items-center justify-center text-white">
        Video Player ({videoId})
      </div>
    </div>
  );
};

export default VideoPlayer; 