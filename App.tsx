'use client';

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BattlefieldMap } from './components/BattlefieldMap';
import { VideoFeed } from './components/VideoFeed';
import { StatsPanel } from './components/StatsPanel';

export default function App() {
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  return (
    <div className="min-h-screen bg-[#2a2d2e] text-gray-100">
      <Navbar onPlayDemo={() => setShouldPlayVideo(true)} />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Main map area */}
        <div className="flex-1 relative">
          <BattlefieldMap />
        </div>
        
        {/* Right sidebar with video feed and stats */}
        <div className="w-[400px] bg-[#1f2122] border-l border-[#3a3d3e] p-4 space-y-4">
          <VideoFeed shouldPlay={shouldPlayVideo} />
          <StatsPanel />
        </div>
      </div>
    </div>
  );
}