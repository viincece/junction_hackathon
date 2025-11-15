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
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#2a2d2e] text-gray-100 relative overflow-hidden">
      <Navbar onPlayDemo={() => setShouldPlayVideo(true)} />
      
      {/* Full screen map with border */}
      <div className="absolute inset-0 top-16 border-4 border-[#3a3d3e]" style={{ overflow: 'visible' }}>
        <BattlefieldMap />
      </div>
      
      {/* Overlaid Components */}
      
      {/* Left Panel - Active Camera */}
      <div className="absolute top-20 left-6 z-20 w-48">
        <ActiveCamera />
      </div>
      
      {/* Grid Reference - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20 w-48">
        <GridReference />
      </div>
      
      {/* Resizable Live Feed Window */}
      <ResizableWindow
        title="LIVE FEED"
        defaultWidth={400}
        defaultHeight={225}
        defaultX={Math.max(0, windowWidth - 420)}
        defaultY={80}
        minWidth={300}
        minHeight={169}
        maintainAspectRatio={true}
        aspectRatio={16 / 9}
      >
        <VideoFeed shouldPlay={shouldPlayVideo} />
      </ResizableWindow>
      
      {/* System Status - Fixed position, below Live Feed */}
      <div className="absolute top-[600px] right-6 z-20 w-[400px]">
        <StatsPanel />
      </div>
    </div>
  );
}

