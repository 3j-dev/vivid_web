import styled from 'styled-components';

import { Colors } from '@/styles/color';
import { LOGIN_SELECT } from './constant';
import { Typography } from '@/styles/style';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(234 234 236) 0px 1px 0px;
  background-color: ${Colors.White};
  z-index: 1;
`;

const HeaderContentContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-item: center;
`;

const HeaderContent = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-content: row;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const UserLogin = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-content: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 96px;
  height: 50px;
  cursor: pointer;
`;

const UserLoginButton = styled.button<{ select: number }>`
  width: 13%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ select }) =>
    select === LOGIN_SELECT.LOGIN ? Colors.White : Colors.Blue3};
  color: ${({ select }) => (select === LOGIN_SELECT.LOGIN ? Colors.Black : Colors.White)};
  border-radius: 20px;
  border: 1px solid ${({ select }) => (select === LOGIN_SELECT.LOGIN ? Colors.Gray0 : Colors.Blue2)};
  ${Typography.Paragraph1};
  &:hover {
    background: ${({ select }) => (select === LOGIN_SELECT.LOGIN ? Colors.Gray0 : Colors.White)};
    border: 1px solid
      ${({ select }) => (select === LOGIN_SELECT.LOGIN ? Colors.Gray0 : Colors.Blue1)};
    box-shadow: ${({ select }) =>
      select === LOGIN_SELECT.LOGIN ? '0' : `${Colors.Blue2} 0 0 0 3px`};
    color: ${({ select }) => (select === LOGIN_SELECT.LOGIN ? Colors.Black : Colors.Blue1)};
  }
`;

const NavDetail = styled.a`
  height: 100%;
  text-decoration: none;
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;
  justify-cotent: center;
  align-items: center;
  color: ${Colors.Black} !important;
  margin-right: 4%;
  cursor: pointer;
  &:hover {
    color: ${Colors.Blue1} !important;
    border-bottom: 2px solid ${Colors.Blue1};
  }
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 24px;
  background: ${Colors.Gray3};
`;

const UserProfileContainer = styled.div<{ isExtended: boolean }>`
  width: ${({ isExtended }) => (isExtended ? '30%' : '50px')};
  height: ${({ isExtended }) => (isExtended ? '80%' : '50px')};
  display: flex;
  flex-direction: row;
  justify-content: ${({ isExtended }) => (isExtended ? 'space-around' : 'center')};
  gap: 30%;
  align-items: center;
  border-radius: ${({ isExtended }) => (isExtended ? '30px' : '50%')};
  background: ${Colors.Blue1};
  opacity: ${({ isExtended }) => (isExtended ? '70%' : '1')};
  transition: all ease 0.5s;
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 2%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export {
  HeaderContainer,
  HeaderContentContainer,
  HeaderContent,
  Logo,
  UserLogin,
  UserLoginButton,
  NavDetail,
  VerticalLine,
  UserProfileContainer,
  UserImage,
};
