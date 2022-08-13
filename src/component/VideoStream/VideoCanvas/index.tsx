import { useState, useRef, useCallback } from 'react';
import { Tldraw, TldrawApp } from '@tldraw/tldraw';

import { VideoCanvasContainer } from './style';

interface Props {
  noteType: number;
}

const VideoCanvas: React.FC<Props> = ({ noteType }: Props) => {
  const videoCanvasRef = useRef<TldrawApp | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);

  const handleMount = useCallback((app: TldrawApp) => {
    videoCanvasRef.current = app;
  }, []);

  return (
    <VideoCanvasContainer ref={outerRef} noteType={noteType}>
      <Tldraw onMount={handleMount} showMenu={false} showPages={false} showUI={false} />
    </VideoCanvasContainer>
  );
};

export default VideoCanvas;