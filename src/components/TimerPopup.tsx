import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useTimerStore } from '../store/timerStore';
import { formatTime } from '../utils/timeUtils';
import { Pause, Play, X, Maximize2 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface PiPState {
  supported: boolean;
  active: boolean;
  ready: boolean;
  error: string | null;
}

export const TimerPopup: React.FC = () => {
  const { 
    tasks, 
    activeTaskId, 
    showPopup, 
    position,
    updateTask, 
    pauseTask, 
    startTask,
    stopTask,
    closePopup,
  } = useTimerStore();
  
  const [pipState, setPipState] = useState<PiPState>({
    supported: false,
    active: false,
    ready: false,
    error: null
  });
  
  const activeTask = activeTaskId ? tasks.find(t => t.id === activeTaskId) : null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastDrawTime = useRef<number>(0);
  const lastRenderTime = useRef<number>(0);
  const rafId = useRef<number>();
  const pipInitialized = useRef(false);

  const FPS = 30;
  const frameInterval = 1000 / FPS;
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'timer-popup',
    data: { type: 'popup' }
  });

  const style = transform ? {
    transform: `translate3d(${position.x + transform.x}px, ${position.y + transform.y}px, 0)`,
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 2147483647,
  } : {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 2147483647,
  };

  // Check PiP support once on mount
  useEffect(() => {
    if (pipInitialized.current) return;
    pipInitialized.current = true;

    const checkPiPSupport = async () => {
      try {
        const supported = document.pictureInPictureEnabled;
        setPipState(prev => ({
          ...prev,
          supported,
          error: supported ? null : 'Picture-in-Picture not supported'
        }));
      } catch (error) {
        setPipState(prev => ({
          ...prev,
          supported: false,
          error: 'Failed to check Picture-in-Picture support'
        }));
      }
    };

    checkPiPSupport();
  }, []);

  const updateTimer = useCallback(() => {
    if (!activeTask?.id || !activeTask.isRunning || activeTask.remainingTime <= 0) return;
    
    const now = performance.now();
    const elapsed = now - lastDrawTime.current;
    lastDrawTime.current = now;

    updateTask(activeTask.id, {
      remainingTime: Math.max(0, activeTask.remainingTime - elapsed)
    });
  }, [activeTask, updateTask]);

  const updatePiPCanvas = useCallback(() => {
    if (!canvasRef.current || !activeTask) return;
    
    const ctx = canvasRef.current.getContext('2d', { 
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    // Clear and set background
    ctx.fillStyle = '#f0f3ff';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw time with anti-aliasing
    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 28px "Space Grotesk"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const timeText = formatTime(activeTask.remainingTime);
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2 - 15;
    
    ctx.fillText(timeText, centerX, centerY);

    // Draw task name
    ctx.font = '16px "Space Grotesk"';
    ctx.fillStyle = '#6366f1';
    const taskName = activeTask.name.length > 30 
      ? activeTask.name.substring(0, 27) + '...'
      : activeTask.name;
    ctx.fillText(taskName, centerX, centerY + 35);

    // Draw progress bar
    const progress = 1 - (activeTask.remainingTime / (activeTask.estimatedTime * 60 * 1000));
    const barHeight = 6;
    const barY = canvasRef.current.height - barHeight - 15;
    const barWidth = canvasRef.current.width - 40;
    const barX = 20;
    
    // Background bar
    ctx.fillStyle = '#e0e7ff';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Progress bar with smooth gradient
    const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth * progress, barY);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#8b5cf6');
    ctx.fillStyle = gradient;
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);
  }, [activeTask]);

  // Initialize video stream once
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current || !pipState.supported || !activeTask) return;

    const initializeStream = async () => {
      try {
        // Initial canvas render
        updatePiPCanvas();
        
        // Create stream with optimized settings
        const stream = canvasRef.current!.captureStream(FPS);
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // Set up video element
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          videoRef.current.autoplay = true;
          
          // Wait for metadata and play to complete
          await Promise.all([
            new Promise<void>((resolve) => {
              if (!videoRef.current) return;
              videoRef.current.onloadedmetadata = () => resolve();
            }),
            videoRef.current.play()
          ]);
          
          setPipState(prev => ({ ...prev, ready: true, error: null }));
        }
      } catch (error) {
        console.error('Failed to initialize stream:', error);
        setPipState(prev => ({
          ...prev,
          ready: false,
          error: 'Failed to initialize video stream'
        }));
      }
    };

    initializeStream();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [pipState.supported, activeTask?.id, updatePiPCanvas]);

  // Update timer and canvas
  useEffect(() => {
    if (!activeTask?.isRunning || activeTask.remainingTime <= 0) return;

    lastDrawTime.current = performance.now();
    lastRenderTime.current = performance.now();

    const updateFrame = () => {
      updateTimer();
      updatePiPCanvas();
      rafId.current = requestAnimationFrame(updateFrame);
    };

    rafId.current = requestAnimationFrame(updateFrame);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [activeTask?.isRunning, activeTask?.remainingTime, updateTimer, updatePiPCanvas]);

  // Handle PiP events
  useEffect(() => {
    if (!pipState.supported) return;

    const handlePiPChange = () => {
      setPipState(prev => ({
        ...prev,
        active: document.pictureInPictureElement === videoRef.current
      }));
    };

    document.addEventListener('enterpictureinpicture', handlePiPChange);
    document.addEventListener('leavepictureinpicture', handlePiPChange);
    
    return () => {
      document.removeEventListener('enterpictureinpicture', handlePiPChange);
      document.removeEventListener('leavepictureinpicture', handlePiPChange);
    };
  }, [pipState.supported]);

  const togglePiP = async () => {
    if (!videoRef.current || !pipState.ready || !pipState.supported) return;
    
    try {
      if (document.pictureInPictureElement === videoRef.current) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Failed to toggle Picture-in-Picture mode:', error);
      setPipState(prev => ({
        ...prev,
        error: 'Failed to toggle Picture-in-Picture mode'
      }));
    }
  };

  if (!showPopup || !activeTask) return null;

  const progress = 1 - (activeTask.remainingTime / (activeTask.estimatedTime * 60 * 1000));

  return (
    <>
      <div 
        ref={setNodeRef}
        style={style}
        className="w-[400px] shadow-2xl"
        {...attributes}
      >
        <div className="neumorphic rounded-2xl bg-[#f0f3ff] overflow-hidden relative select-none backdrop-blur-sm bg-opacity-95">
          <div 
            className="absolute inset-0 progress-bar opacity-10"
            style={{ width: `${progress * 100}%` }}
          />
          
          <div 
            className="absolute left-0 top-0 h-full w-1.5 progress-bar"
            style={{ transform: `scaleY(${progress})`, transformOrigin: 'bottom' }}
          />
          
          <div className="p-6 pl-8 relative">
            <div className="cursor-move absolute inset-0" {...listeners} />
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-indigo-600 font-mono z-10 relative">
                {formatTime(activeTask.remainingTime)}
              </span>
              <div className="flex items-center gap-2 z-50">
                {pipState.supported && pipState.ready && (
                  <button
                    onClick={togglePiP}
                    className={`p-2 rounded-xl neumorphic-button ${
                      pipState.active 
                        ? 'bg-indigo-100 text-indigo-900' 
                        : 'text-indigo-600 hover:text-indigo-700'
                    }`}
                    type="button"
                    title="Picture in Picture"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeTask.isRunning) {
                      pauseTask(activeTask.id);
                    } else {
                      startTask(activeTask.id);
                    }
                  }}
                  className={`p-2 rounded-xl neumorphic-button ${
                    activeTask.isRunning
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                  type="button"
                >
                  {activeTask.isRunning ? 
                    <Pause className="w-4 h-4" /> : 
                    <Play className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    stopTask(activeTask.id);
                    closePopup();
                  }}
                  className="p-2 rounded-xl neumorphic-button text-indigo-600 hover:text-indigo-700"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="text-lg font-semibold text-indigo-900 truncate pr-4 z-10 relative">
              {activeTask.name}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed opacity-0 pointer-events-none">
        <canvas 
          ref={canvasRef}
          width="320"
          height="180"
          className="hidden"
        />
        <video
          ref={videoRef}
          width="320"
          height="180"
          muted
          playsInline
          autoPlay
        />
      </div>
    </>
  );
};