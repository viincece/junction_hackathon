'use client';

import { useEffect, useState } from 'react';

interface NavbarProps {
  onPlayDemo: () => void;
  isPressed?: boolean;
}

export function Navbar({ onPlayDemo, isPressed = false }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="h-16 bg-[#1f2122] border-b border-[#3a3d3e] flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white tracking-wide font-alphaLyrae">DDD: Drone Detection & Destruction</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayDemo}
          className={`px-4 py-2 text-white font-medium rounded transition-colors ${
            isPressed 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isPressed}
        >
          Play demo
        </button>
        <span className="text-green-500 font-medium">ONLINE</span>
        <span className="text-gray-300 font-mono">{currentTime}</span>
      </div>
    </nav>
  );
}

