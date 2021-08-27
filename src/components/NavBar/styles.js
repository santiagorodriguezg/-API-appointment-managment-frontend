import { Button, Layout, Menu } from 'antd';
import styled from 'styled-components';

import Colors from '../../styles/Colors';

const { Header } = Layout;
const S = {};

S.Header = styled(Header)`
  background: #fff;
  box-shadow: 0 1px 5px #c9c9c9;
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 12px;
  z-index: 1;

  .ant-row {
    height: 100%;
  }

  @media (min-width: 992px) {
    padding: 0 50px;
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
    float: left;
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
  padding-right: 0;

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
