import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';

import { Colors } from '@/styles/color';

const LoaderSpiner: React.FC = () => {
  return (
    <BackgroundBlur>
      <TailSpin
        height="120"
        width="120"
        ariaLabel="tail-spin-loading"
        color={Colors.Blue1}
        radius="1"
        visible={true}
      />
    </BackgroundBlur>
  );
};

const BackgroundBlur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Colors.White1};
  opacity: 0.6;
  z-index: 5;
`;

export default LoaderSpiner;
