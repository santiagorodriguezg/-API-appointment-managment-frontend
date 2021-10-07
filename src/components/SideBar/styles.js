import styled from 'styled-components';
import { Drawer, Layout, Menu } from 'antd';

const { Sider } = Layout;
const S = {};

S.Sider = styled(Sider)`
  overflow: auto;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 64px;
  bottom: 0;
  left: 0;
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

S.Drawer = styled(Drawer)`
  @media (min-width: 992px) {
    display: none;
  }
`;

S.Menu = styled(Menu)`
  border: none;
`;

export default S;
