import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: '首页', href: '/' },
    { icon: '🔥', label: '热门', href: '/trending' },
    { icon: '📝', label: '订阅内容', href: '/subscriptions' },
    { icon: '📚', label: '媒体库', href: '/library' },
  ];

  return (
    <aside className="w-64 bg-white border-r">
      <nav className="p-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center p-3 rounded-lg hover:bg-gray-100"
          >
            <span className="mr-4">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 