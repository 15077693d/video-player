export interface VideoTimerState {
  youtubeUrl: string;
  startTime: number;
  endTime: number;
  isPlaying: boolean;
  currentTime: number;
  overlayStyle: OverlayStyle;
}

export type OverlayStyle = 'minimal' | 'classic' | 'modern';

export interface OverlayProps {
  currentTime: number;
  style: OverlayStyle;
}