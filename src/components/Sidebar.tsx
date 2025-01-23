import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  type?: 'divider';
  icon?: string;
  label?: string;
  href?: string;
  highlight?: boolean;
  gradient?: string;
}

const Sidebar = () => {
  const router = useRouter();
  const menuItems: MenuItem[] = [
    { 
      icon: '🏠', 
      label: '首页', 
      href: '/',
      gradient: 'from-pink-500 via-pink-400 to-rose-500'
    },
    { 
      icon: '🔥', 
      label: '热门', 
      href: '/trending',
      gradient: 'from-orange-500 via-amber-400 to-amber-500'
    },
    { 
      icon: '📝', 
      label: '订阅内容', 
      href: '/subscriptions',
      gradient: 'from-green-500 via-emerald-400 to-emerald-500'
    },
    { 
      icon: '📚', 
      label: '媒体库', 
      href: '/library',
      gradient: 'from-blue-500 via-cyan-400 to-cyan-500'
    },
    { type: 'divider' },
    { 
      icon: '🌸', 
      label: '紫罗兰永恒花园', 
      href: '/series/violet-evergarden',
      highlight: true,
      gradient: 'from-violet-500 via-purple-400 to-purple-500'
    }
  ];

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-64 bg-white/80 backdrop-blur-lg border-r border-gray-100 shadow-lg"
    >
      <motion.nav className="p-3 space-y-1">
        <AnimatePresence mode="wait">
          {menuItems.map((item, index) => (
            item.type === 'divider' ? (
              <motion.div
                key={`divider-${index}`}
                variants={itemVariants}
                className="my-3 border-t border-gray-100"
              />
            ) : (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="relative"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href={item.href!}
                  className={`
                    relative flex items-center p-3 rounded-xl transition-all duration-300
                    overflow-hidden group
                    ${router.pathname === item.href 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-md` 
                      : 'hover:bg-gray-50'
                    }
                    ${item.highlight && router.pathname !== item.href
                      ? 'text-purple-600 hover:text-purple-700'
                      : 'text-gray-700'
                    }
                  `}
                >
                  {/* 背景动画效果 */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r ${item.gradient}
                    opacity-0 group-hover:opacity-10 transition-opacity duration-300
                  `} />

                  {/* 图标容器 */}
                  <div className={`
                    relative w-8 h-8 flex items-center justify-center rounded-lg text-lg
                    transition-all duration-300
                    ${router.pathname === item.href
                      ? 'bg-white/20'
                      : `bg-gradient-to-br ${item.gradient} bg-opacity-10`
                    }
                  `}>
                    {item.icon}
                  </div>

                  <span className="relative ml-3 font-medium">{item.label}</span>

                  {/* 活动指示器 */}
                  {router.pathname === item.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-glow"
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </motion.nav>

      {/* 底部信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm"
      >
        <div className="text-xs text-gray-500 text-center">
          <p>AnimeHub &copy; 2024</p>
          <p className="mt-1">享受动漫的美好时光</p>
        </div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar; 