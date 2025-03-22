import { useState } from "react";
import { VideoInput } from "./components/VideoInput";
import { VideoPlayer } from "./components/VideoPlayer";
import { Congratulations } from "./components/Congratulations";
import { VideoTimerState, OverlayStyle } from "./types";
import { extractVideoId } from "./utils";
import "./App.css";

function App() {
  const [state, setState] = useState<VideoTimerState>({
    youtubeUrl: "",
    startTime: 0,
    endTime: 0,
    isPlaying: false,
    currentTime: 0,
    overlayStyle: "modern" as OverlayStyle,
  });

  const [showCongrats, setShowCongrats] = useState(false);

  const handleStart = (url: string, startTime: number, endTime: number) => {
    setState({
      ...state,
      youtubeUrl: url,
      startTime,
      endTime,
      isPlaying: true,
      currentTime: startTime,
    });
  };

  const handleTimeUpdate = (time: number) => {
    setState((prev) => ({ ...prev, currentTime: time }));
  };

  const handleVideoEnd = () => {
    setShowCongrats(true);
  };

  const handleBack = () => {
    setState((prev) => ({ ...prev, isPlaying: false }));
    setShowCongrats(false);
  };

  const videoId = state.youtubeUrl ? extractVideoId(state.youtubeUrl) : null;

  if (showCongrats) {
    return <Congratulations onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      {!state.isPlaying ? (
        <VideoInput onSubmit={handleStart} />
      ) : videoId ? (
        <VideoPlayer
          videoId={videoId}
          startTime={state.startTime}
          endTime={state.endTime}
          overlayStyle={state.overlayStyle}
          onTimeUpdate={handleTimeUpdate}
          onVideoEnd={handleVideoEnd}
          onBack={handleBack}
        />
      ) : (
        <div className="text-red-500">Invalid YouTube URL</div>
      )}
    </div>
  );
}

export default App;
