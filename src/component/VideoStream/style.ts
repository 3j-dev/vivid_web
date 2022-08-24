import { Colors } from '@/util/Constant';
import styled from 'styled-components';

interface Props {
  canvasActivated: boolean;
}

export const VideoStreamContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.Gray};
  position: relative;
`;

export const Video = styled.div`
  align-self: center;
  position: relative;
  width: 92%;
  height: 87.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    border-radius: 10px;
  }
`;

export const VideoCanvasButton = styled.div<Props>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${Colors.Blue};
  cursor: pointer;
  box-shadow: 1px 1px 1px -1px;
  display: ${({ canvasActivated }) => (canvasActivated ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0%;
  bottom: 6%;
`;
