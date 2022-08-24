import ReactHlsPlayer from 'react-hls-player';
import FormData from 'form-data';
import axios from 'axios';
import { TldrawApp } from '@tldraw/tldraw';
import { BsPencilSquare } from 'react-icons/bs';
import { useRef, useState, useEffect } from 'react';

import VideoCanvas from './VideoCanvas';
import VideoControl from './VideoControl';
import VideoCanvasTool from './VideoCanvasTool';
import { VideoStreamContainer, Video, VideoCanvasButton } from './style';
import VideoTopBar from './VideoTopBar';

interface DimensionProps {
  w: number;
  h: number;
}

const videoSource: string = process.env.TEST_VIDEO_URL as string;

interface StreamProps {
  snapShotClicked: boolean;
  setSnapShotClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSnapShotURL: React.Dispatch<React.SetStateAction<string>>;
}

const VideoStream: React.FC<StreamProps> = ({
  snapShotClicked,
  setSnapShotClicked,
  setSnapShotURL,
}: StreamProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoCanvasRef = useRef<TldrawApp | null>(null);
  const [dimensions, setDimensions] = useState<DimensionProps>({ w: 0, h: 0 });
  const [canvasActivated, setCanvasActivated] = useState<boolean>(false);

  const context = canvasRef === null ? null : canvasRef.current?.getContext('2d');

  const getVideoSizeData = (videoRef: React.RefObject<HTMLVideoElement>) => {
    const ratio: number = videoRef.current!.videoWidth / videoRef.current!.videoHeight;
    const w: number = videoRef.current!.videoWidth - 100;
    const h: number = w / ratio;
    return {
      ratio,
      w,
      h,
    };
  }; // get videoRef & return videoElement's ratio, width, height

  const snapShot = () => {
    if (context && playerRef.current) {
      context.fillRect(0, 0, dimensions.w, dimensions.h);
      context.drawImage(playerRef.current, 0, 0, dimensions.w, dimensions.h);

      canvasRef.current?.toBlob((blob) => {
        const formData = new FormData();
        formData.append('multipartFile', blob, 'test.png');
        axios
          .post(process.env.SNAPSHOT_API, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            setSnapShotURL(response.data[0].filePath);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }; // drawing video snapshot on canvas and post with axios then get filepath on S3 storage

  useEffect(() => {
    // Add listener when the video is actually available for
    // the browser to be able to check the dimensions of the video.
    if (playerRef.current) {
      playerRef.current.addEventListener('loadedmetadata', () => {
        const { w, h } = getVideoSizeData(playerRef);
        canvasRef.current!.width = w;
        canvasRef.current!.height = h;
        setDimensions({
          w,
          h,
        });
      });
    }
  }, []);

  useEffect(() => {
    snapShotClicked && snapShot();
    setSnapShotClicked(false);
  }, [snapShotClicked]);
  // chang state by snapshot action

  return (
    <VideoStreamContainer>
      <VideoTopBar videoTitle="1주차 - 포켓몬 환경의 이해" />
      <Video>
        <ReactHlsPlayer
          playerRef={playerRef}
          src={videoSource}
          controls={false}
          muted={false}
          width="100%"
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <VideoCanvas canvasActivated={canvasActivated} videoCanvasRef={videoCanvasRef} />
        <VideoCanvasButton
          canvasActivated={canvasActivated}
          onClick={() => setCanvasActivated(true)}
        >
          <BsPencilSquare size={30} color="white" />
        </VideoCanvasButton>
      </Video>
      <VideoCanvasTool
        playerRef={playerRef}
        videoCanvasRef={videoCanvasRef}
        canvasActivated={canvasActivated}
        setCanvasActivated={setCanvasActivated}
      />
      <VideoControl playerRef={playerRef} />
    </VideoStreamContainer>
  );
};

export default VideoStream;
