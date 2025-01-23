import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        {/* YouTube 加载动画 */}
        <div className="absolute inset-0">
          <div className="animate-[youtube-loading_1s_ease-in-out_infinite] w-full h-full border-4 border-gray-300 border-t-red-600 rounded-full" />
        </div>
        {/* YouTube Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-8 bg-red-600 rounded-lg relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent" />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-lg text-gray-600">加载中...</p>
    </div>
  );
};

export default Loading; 