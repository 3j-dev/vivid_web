import styled from 'styled-components';

import { Colors } from '@/styles/color';

const ToVividContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.Black1};
  gap: 6%;
`;

const ToVividImage = styled.img`
  width: 40%;
  height: auto;
  margin-left: -10%;
`;

const ToVividTextGroup = styled.div`
    width: 50%;
    height: 70%
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ToVividText = styled.p`
  font-size: 44px;
  font-weight: 700;
  line-height: 100px;
  letter-spacing: -0.07em;
  color: ${Colors.White};
  text-align: center;
`;

export { ToVividContainer, ToVividImage, ToVividTextGroup, ToVividText };
