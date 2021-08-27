import { Button, Layout, Menu } from 'antd';
import styled from 'styled-components';

import Colors from '../../styles/Colors';

const { Header } = Layout;
const S = {};

S.Header = styled(Header)`
  position: relative;
  background: #fff;
  box-shadow: 0 1px 5px #c9c9c9;

  .ant-row {
    height: 100%;
  }
`;

S.LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

S.NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

S.Logo = styled.h1`
  margin: 0;
  color: ${Colors.primary};
  display: none;

  @media (min-width: 440px) {
    display: block;
  }
`;

S.IconMenu = styled(Button)`
  margin-top: 5px;

  span {
    font-size: 20px;
  }
`;

S.Menu = styled(Menu)`
  width: auto;
  border: none;
`;

S.DropdownMenu = styled(Menu)`
  width: 200px;

  .ant-menu-horizontal,
  .ant-menu-item::after,
  .ant-menu-submenu::after {
    border: none !important;
  }
`;

S.UserMenu = styled(Button)`
  height: auto;
  border: none;
  border-radius: 0;
  background: white;

  &:hover,
  &:focus {
    background: white;
    color: ${Colors.primary};
  }
`;

S.ButtonMoreOutlined = styled(S.UserMenu)`
  span {
    font-size: 24px;
  }
`;

export default S;
