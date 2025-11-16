'use client';

import { useState, useRef, useEffect } from 'react';
import { Minus, Maximize2 } from 'lucide-react';

interface ResizableWindowProps {
  children: React.ReactNode;
  title: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minWidth?: number;
  minHeight?: number;
  maintainAspectRatio?: boolean;
  aspectRatio?: number; // width / height
}

export function ResizableWindow({
  children,
  title,
  defaultWidth = 400,
  defaultHeight = 500,
  defaultX = 0,
  defaultY = 0,
  minWidth = 300,
  minHeight = 200,
  maintainAspectRatio = false,
  aspectRatio = 16 / 9,
}: ResizableWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        if (maintainAspectRatio) {
          // Use the larger delta to maintain aspect ratio
          const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
          const newWidth = Math.max(minWidth, resizeStart.width + delta);
          const newHeight = Math.max(minHeight, newWidth / aspectRatio);
          setSize({ width: newWidth, height: newHeight });
        } else {
          const newWidth = Math.max(minWidth, resizeStart.width + deltaX);
          const newHeight = Math.max(minHeight, resizeStart.height + deltaY);
          setSize({ width: newWidth, height: newHeight });
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      // Prevent text selection during drag/resize
      document.body.style.userSelect = 'none';
      document.body.style.cursor = isDragging ? 'grabbing' : (isResizing ? 'nwse-resize' : 'default');
      
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, minWidth, minHeight, maintainAspectRatio, aspectRatio]);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    setIsResizing(true);
  };

  if (isMinimized) {
    return (
      <div
        ref={windowRef}
        className="absolute bg-black/30 backdrop-blur-md border border-[#3a3d3e] rounded-t-lg shadow-lg z-30"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
        }}
      >
        <div
          ref={headerRef}
          onMouseDown={handleHeaderMouseDown}
          className="flex items-center justify-between px-4 py-2 cursor-move bg-black/30 backdrop-blur-md border-b border-[#3a3d3e] rounded-t-lg select-none"
        >
          <span className="text-sm font-semibold text-white">{title}</span>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-gray-400 hover:text-white p-1"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={windowRef}
      className="absolute bg-black/30 backdrop-blur-md border border-[#3a3d3e] rounded-lg shadow-lg z-30 flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        onMouseDown={handleHeaderMouseDown}
        className="flex items-center justify-between px-4 py-2 cursor-move bg-black/30 backdrop-blur-md border-b border-[#3a3d3e] rounded-t-lg select-none"
      >
        <span className="text-sm font-semibold text-white">{title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-gray-400 hover:text-white p-1"
            title="Minimize"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden rounded-b-lg">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize select-none"
        style={{
          background: 'linear-gradient(-45deg, transparent 0%, transparent 30%, #3a3d3e 30%, #3a3d3e 35%, transparent 35%, transparent 65%, #3a3d3e 65%, #3a3d3e 70%, transparent 70%)',
        }}
      />
    </div>
  );
}

