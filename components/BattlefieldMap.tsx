'use client';

import { useState } from 'react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface CameraMarker {
  id: string;
  x: number; // percentage
  y: number; // percentage
  angle: number; // degrees
  hasFieldOfView: boolean;
  isActive: boolean;
}

const cameras: CameraMarker[] = [
  { id: 'CAM-03', x: 39, y: 38, angle: 0, hasFieldOfView: true, isActive: true },
  { id: 'CAM-02', x: 37, y: 36, angle: 90, hasFieldOfView: true, isActive: true },
  { id: 'CAM-01', x: 18, y: 20, angle: 310, hasFieldOfView: true, isActive: true },
  { id: 'CAM-05', x: 51, y: 75, angle: 350, hasFieldOfView: true, isActive: true },
  { id: 'CAM-04', x: 50, y: 70, angle: 95, hasFieldOfView: true, isActive: true },
  { id: 'CAM-06', x: 65, y: 90, angle: 90, hasFieldOfView: true, isActive: true },
];

export function BattlefieldMap() {
  const [isHoveringHQ, setIsHoveringHQ] = useState(false);

  return (
    <div className="w-full h-full relative bg-[#2a2d2e]" style={{ overflow: 'visible' }}>
      {/* Map Image */}
      <ImageWithFallback
        src="/Download.png"
        alt="Satellite Map"
        className="w-full h-full object-cover"
      />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          opacity: 0.45,
          zIndex: 1,
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern 
              id="grid-pattern" 
              x="0" 
              y="0" 
              width="120" 
              height="120" 
              patternUnits="userSpaceOnUse"
            >
              {/* Cross at intersection point - horizontal line */}
              <line 
                x1="55" 
                y1="60" 
                x2="65" 
                y2="60" 
                stroke="white" 
                strokeWidth="0.5"
              />
              {/* Cross at intersection point - vertical line */}
              <line 
                x1="60" 
                y1="55" 
                x2="60" 
                y2="65" 
                stroke="white" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      
      {/* Four squares connected with lines forming a box */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 5,
        }}
      >
        {/* Transparent blue fill for the box area */}
        <div
          className="absolute inset-0 cursor-pointer"
          style={{
            clipPath: 'polygon(52% 34%, 61% 43%, 60% 53%, 53.5% 48%)',
            backgroundColor: '#0E02FA',
            opacity: 0.3,
          }}
          onMouseEnter={() => setIsHoveringHQ(true)}
          onMouseLeave={() => setIsHoveringHQ(false)}
        />
        
        {/* Tooltip */}
        {isHoveringHQ && (
          <div
            className="absolute bg-black/90 text-white px-3 py-2 rounded border border-white/20 shadow-lg pointer-events-none"
            style={{
              left: '56.5%',
              top: '43%',
              transform: 'translate(-50%, -100%)',
              marginBottom: '8px',
              zIndex: 20,
              whiteSpace: 'nowrap',
            }}
          >
            <div className="font-semibold text-sm">HQ: Hybridiarena Hype</div>
            <div className="text-xs text-gray-300 mt-1">Defense-Systems active</div>
          </div>
        )}
        
        <svg className="w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Connecting lines to form a box */}
          {/* Top line */}
          <line x1="52%" y1="34%" x2="61%" y2="43%" stroke="#0E02FA" strokeWidth="1" />
          {/* Bottom line */}
          <line x1="53.5%" y1="48%" x2="60%" y2="53%" stroke="#0E02FA" strokeWidth="1" />
          {/* Left line */}
          <line x1="52%" y1="34%" x2="53.5%" y2="48%" stroke="#0E02FA" strokeWidth="1" />
          {/* Right line */}
          <line x1="61%" y1="43%" x2="60%" y2="53%" stroke="#0E02FA" strokeWidth="1" />
        </svg>
        
        {/* Four squares */}
        {/* Top-left square */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '52%',
            top: '34%',
            width: '8px',
            height: '8px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0E02FA',
            border: '1px solid #0E02FA',
          }}
        />
        {/* Top-right square */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '61%',
            top: '43%',
            width: '8px',
            height: '8px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0E02FA',
            border: '1px solid #0E02FA',
          }}
        />
        {/* Bottom-left square */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '53.5%',
            top: '48%',
            width: '8px',
            height: '8px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0E02FA',
            border: '1px solid #0E02FA',
          }}
        />
        {/* Bottom-right square */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '60%',
            top: '53%',
            width: '8px',
            height: '8px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0E02FA',
            border: '1px solid #0E02FA',
          }}
        />
      </div>
      
      {/* Camera Markers - Using absolute positioning */}
      {cameras.map((camera) => {
        return (
          <div
            key={camera.id}
            className="absolute pointer-events-none"
            style={{
              left: `${camera.x}%`,
              top: `${camera.y}%`,
              transform: 'translate(-50%, -50%)',
              overflow: 'visible',
              zIndex: 10,
            }}
          >
            {/* Camera triangle with FOV cone */}
            <svg
              width="600"
              height="600"
              viewBox="-300 -300 600 600"
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                overflow: 'visible',
              }}
            >
              <g transform={`rotate(${camera.angle})`}>
                 {/* Field of view cone - simple triangle overlapping from camera triangle */}
                 {camera.hasFieldOfView && (
                   <>
                     {/* Filled triangle */}
                     <polygon
                       points="0,-10 -70,200 70,200"
                       fill="#22c55e"
                       fillOpacity="0.4"
                     />
                     {/* Border outline - rendered on top */}
                     <polygon
                       points="0,-10 -70,200 70,200"
                       fill="none"
                       stroke="#22c55e"
                       strokeWidth="2.5"
                       strokeOpacity="1"
                       vectorEffect="non-scaling-stroke"
                     />
                   </>
                 )}
                
                {/* Camera triangle */}
                <polygon
                  points="0,-14 -12,10 12,10"
                  fill={camera.isActive ? "#dc2626" : "#9ca3af"}
                  stroke={camera.isActive ? "#ffffff" : "#6b7280"}
                  strokeWidth="2"
                />
              </g>
            </svg>
            
            {/* Camera Label - positioned at upper right */}
            <div
              className="absolute text-white text-xs font-bold whitespace-nowrap bg-black/70 px-2 py-0.5 rounded z-10 flex items-center gap-1.5"
              style={{
                left: '20px',
                top: '-20px',
                transform: 'translate(0, 0)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {camera.id}
              {camera.isActive && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-green-500"
                  style={{
                    boxShadow: '0 0 4px #22c55e, 0 0 8px #22c55e, 0 0 12px #22c55e',
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

