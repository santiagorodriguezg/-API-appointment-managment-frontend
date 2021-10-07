import { Button, Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Colors } from '../../styles/Variables';

const { Header } = Layout;
const S = {};

S.Header = styled(Header)`
  background: #fff;
  box-shadow: 0 1px 5px #c9c9c9;
  padding: 0 12px;
  width: 100%;

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

S.Logo = styled.a`
  height: 100%;
  display: flex;
  align-items: center;

  img {
    height: 60px;
  }
`;

S.IconMenu = styled(MenuOutlined)`
  font-size: 20px;
  padding-right: 10px;
`;

S.Menu = styled(Menu)`
  width: auto;
  border: none;
`;

S.DropdownMenu = styled(Menu)`
  border: none !important;
  justify-content: end;

  .ant-menu-horizontal,
  .ant-menu-item::after,
  .ant-menu-submenu::after {
    border: none !important;
  }

  .anticon.anticon-ellipsis {
    font-size: 32px;
    line-height: 62px;
    transform: rotate(90deg);
  }

  @media (min-width: 992px) {
    width: 100%;
  }
`;

S.DropdownUserMenu = styled(Menu)`
  width: 250px;

  li:first-of-type {
    background: none;
    cursor: default;
    pointer-events: none;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
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

  .anticon-caret-down {
    font-size: 13px;
    vertical-align: sub;
  }
`;

export default S;
