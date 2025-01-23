import React from 'react';

interface CommentSectionProps {
  videoId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ videoId }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">评论</h3>
      <div className="flex space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="添加评论..."
            className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CommentSection; 