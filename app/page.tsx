'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { BattlefieldMap } from '@/components/BattlefieldMap';
import { VideoFeed } from '@/components/VideoFeed';
import { StatsPanel } from '@/components/StatsPanel';
import { ActiveCamera } from '@/components/ActiveCamera';
import { GridReference } from '@/components/GridReference';
import { ResizableWindow } from '@/components/ResizableWindow';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(1920);
  const [windowHeight, setWindowHeight] = useState(1080);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoShown, setIsVideoShown] = useState(false);
  const [notificationTime, setNotificationTime] = useState<string>('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isVideoShown) {
      // Set the timestamp when notification appears
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setNotificationTime(`${hours}:${minutes}:${seconds}`);
    } else {
      setNotificationTime('');
    }
  }, [isVideoShown]);

  return (
    <div className="min-h-screen bg-[#2a2d2e] text-gray-100 relative overflow-hidden">
      <Navbar onPlayDemo={() => setShouldPlayVideo(true)} isPressed={shouldPlayVideo} />
      
      {/* Notification Popup */}
      {isVideoShown && notificationTime && (
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 top-20 z-30 bg-red-600 text-white px-12 py-6 rounded-lg shadow-xl border-2 border-red-700 animate-pulse"
          style={{ marginTop: '4px' }}
        >
          <div className="flex items-center gap-6">
            <span className="font-mono text-xl font-bold">{notificationTime}</span>
            <span className="text-xl font-bold">Drone detected in ZONE-3</span>
            {/* Drone Icon with 4 rotors */}
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              {/* Central body */}
              <rect x="12" y="14" width="8" height="4" rx="1" fill="white" transform="rotate(45 16 16)" />
              {/* Top rotor */}
              <circle cx="16" cy="8" r="3" stroke="white" strokeWidth="1.5" fill="none" />
              <line x1="16" y1="5" x2="16" y2="11" stroke="white" strokeWidth="1.5" />
              <line x1="13" y1="8" x2="19" y2="8" stroke="white" strokeWidth="1.5" />
              {/* Bottom rotor */}
              <circle cx="16" cy="24" r="3" stroke="white" strokeWidth="1.5" fill="none" />
              <line x1="16" y1="21" x2="16" y2="27" stroke="white" strokeWidth="1.5" />
              <line x1="13" y1="24" x2="19" y2="24" stroke="white" strokeWidth="1.5" />
              {/* Left rotor */}
              <circle cx="8" cy="16" r="3" stroke="white" strokeWidth="1.5" fill="none" />
              <line x1="5" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.5" />
              <line x1="8" y1="13" x2="8" y2="19" stroke="white" strokeWidth="1.5" />
              {/* Right rotor */}
              <circle cx="24" cy="16" r="3" stroke="white" strokeWidth="1.5" fill="none" />
              <line x1="21" y1="16" x2="27" y2="16" stroke="white" strokeWidth="1.5" />
              <line x1="24" y1="13" x2="24" y2="19" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Full screen map with border */}
      <div className="absolute inset-0 top-16 border-4 border-[#3a3d3e]" style={{ overflow: 'visible' }}>
        <BattlefieldMap isVideoPlaying={isVideoShown} />
      </div>
      
      {/* Overlaid Components */}
      
      {/* Left Panel - Active Camera */}
      <div className="absolute top-20 left-6 z-20 w-48">
        <ActiveCamera isVideoShown={isVideoShown} />
      </div>
      
      {/* Grid Reference - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20 w-48">
        <GridReference />
      </div>
      
      {/* Resizable Live Feed Window */}
      <ResizableWindow
        title="LIVE FEED"
        defaultWidth={600}
        defaultHeight={338}
        defaultX={Math.max(0, windowWidth - 600 - 270)}
        defaultY={Math.max(80, windowHeight - 1200)}
        minWidth={300}
        minHeight={169}
        maintainAspectRatio={true}
        aspectRatio={16 / 9}
      >
        <VideoFeed shouldPlay={shouldPlayVideo} onVideoPlaying={setIsVideoPlaying} onVideoShown={setIsVideoShown} />
      </ResizableWindow>
      
      {/* System Status - Fixed position, below Live Feed */}
      <div className="absolute bottom-6 right-6 z-20 w-[400px]">
        <StatsPanel isVideoShown={isVideoShown} />
      </div>
    </div>
  );
}

