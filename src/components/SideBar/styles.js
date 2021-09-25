import styled from 'styled-components';
import { Layout, Menu } from 'antd';

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
`;

S.Menu = styled(Menu)`
  border: none;
`;

export default S;
