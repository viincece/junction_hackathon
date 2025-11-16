'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const cameras = [
  { id: 'CAM-01', isActive: true },
  { id: 'CAM-02', isActive: true },
  { id: 'CAM-03', isActive: true },
  { id: 'CAM-04', isActive: true },
  { id: 'CAM-05', isActive: true },
  { id: 'CAM-06', isActive: true },
];

interface ActiveCameraProps {
  isVideoShown?: boolean;
}

export function ActiveCamera({ isVideoShown = false }: ActiveCameraProps) {
  return (
    <Card className="bg-black/30 backdrop-blur-md border-[#3a3d3e] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-gray-400">Active Cameras</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {cameras.map((camera) => (
            <div key={camera.id} className="flex items-center gap-2">
              <div 
                className={`text-sm font-semibold ${
                  isVideoShown && camera.id === 'CAM-03' ? 'text-red-500' : ''
                }`}
              >
                {camera.id}
              </div>
              {camera.isActive && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-green-500"
                  style={{
                    boxShadow: '0 0 4px #22c55e, 0 0 8px #22c55e, 0 0 12px #22c55e',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

