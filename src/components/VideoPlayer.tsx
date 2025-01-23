import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={videoUrl}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer; 