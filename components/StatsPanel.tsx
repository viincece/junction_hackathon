'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DroneSighting {
  date: string;
  time: string;
  message: string;
}

interface StatsPanelProps {
  isVideoShown?: boolean;
}

export function StatsPanel({ isVideoShown = false }: StatsPanelProps) {
  const [sightings, setSightings] = useState<DroneSighting[]>([]);
  const isHighAlert = isVideoShown;
  const alertText = isHighAlert ? 'HIGH' : 'LOW';
  const alertClass = isHighAlert ? 'text-red-500' : 'text-green-500';
  const detectionEventsCount = isVideoShown ? '2' : '1';

  // Seed with 5 dummy threats with specific dates/times/zones
  useEffect(() => {
    const toFixedDate = (d: number, m: number, y: number) =>
      `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`;

    const dummy: DroneSighting[] = [
      { date: toFixedDate(15, 11, 2025), time: '15:12:05', message: 'Threat: Drone in ZONE-2' },
      { date: toFixedDate(15, 11, 2025), time: '09:45:22', message: 'Threat: Drone in ZONE-5' },
      { date: toFixedDate(13, 11, 2025), time: '18:02:11', message: 'Threat: Drone in ZONE-1' },
      { date: toFixedDate(11, 11, 2025), time: '07:55:42', message: 'Threat: Drone in ZONE-4' },
      { date: toFixedDate(8, 11, 2025), time: '21:30:09', message: 'Threat: Drone in ZONE-6' },
    ];

    setSightings(dummy);
  }, []);

  useEffect(() => {
    if (isVideoShown) {
      const now = new Date();
      // dd.mm.yyyy
      const date = `${String(now.getDate()).padStart(2, '0')}.${String(
        now.getMonth() + 1,
      ).padStart(2, '0')}.${now.getFullYear()}`;
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      
      const newSighting: DroneSighting = {
        date,
        time,
        message: 'Threat: Drone in ZONE-3'
      };
      
      setSightings(prev => [newSighting, ...prev].slice(0, 5));
    }
  }, [isVideoShown]);

  return (
    <Card className="bg-black/30 backdrop-blur-md border-[#3a3d3e] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">SYSTEM STATUS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs text-gray-400">Detection Events (24h)</div>
            <div className="text-lg font-semibold">{detectionEventsCount}</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-xs text-gray-400">Alert Level</div>
            <div className={`text-lg font-semibold ${alertClass}`}>{alertText}</div>
          </div>
        </div>
        
        {/* Drone Sightings Feed */}
        <div className="pt-4 border-t border-[#3a3d3e]">
          <div className="text-xs text-gray-400 mb-2">Recent Threats</div>
          <div className="space-y-2">
            {sightings.length > 0 ? (
              sightings.map((sighting, index) => (
                <div
                  key={index}
                  className={`text-xs p-2 rounded ${
                    isVideoShown && index === 0
                      ? 'bg-orange-500/30 text-white border border-orange-500'
                      : 'text-gray-300 bg-black/30 backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{sighting.date}</span>
                    <span className="font-mono">{sighting.time}</span>
                    <span>{sighting.message}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 italic">No recent threats</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

