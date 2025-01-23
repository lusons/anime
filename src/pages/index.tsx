import React from 'react'

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div key={index} className="cursor-pointer">
          <div className="aspect-video bg-gray-200 rounded-lg"></div>
          <div className="mt-2 flex">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="ml-2">
              <h3 className="font-medium">视频标题 {index}</h3>
              <p className="text-sm text-gray-500">频道名称</p>
              <p className="text-sm text-gray-500">10万次观看 · 1天前</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePage 