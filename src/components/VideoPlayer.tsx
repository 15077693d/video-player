import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { motion } from "framer-motion";
import { TimerOverlay } from "./TimerOverlay";
import { OverlayStyle } from "../types";

interface VideoPlayerProps {
  videoId: string;
  startTime: number;
  endTime: number;
  overlayStyle: OverlayStyle;
  onTimeUpdate: (time: number) => void;
  onVideoEnd: () => void;
  onBack: () => void;
}

export function VideoPlayer({
  videoId,
  startTime,
  endTime,
  overlayStyle,
  onTimeUpdate,
  onVideoEnd,
  onBack,
}: VideoPlayerProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState(startTime);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    playerRef.current.seekTo(startTime);
    playerRef.current.playVideo();

    intervalRef.current = window.setInterval(() => {
      const time = playerRef.current?.getCurrentTime() || 0;
      setCurrentTime(time);
      onTimeUpdate(time);

      if (time >= endTime) {
        playerRef.current?.pauseVideo();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        onVideoEnd();
      }
    }, 100);
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full h-0 pb-[56.25%] relative max-w-7xl mx-auto">
        <YouTube
          videoId={videoId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              start: startTime,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
            },
          }}
          onReady={handleReady}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      <TimerOverlay currentTime={currentTime} style={overlayStyle} />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg"
        onClick={onBack}
      >
        Back
      </motion.button>
    </div>
  );
}
