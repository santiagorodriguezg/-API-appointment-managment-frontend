import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;
const S = {};

S.Layout = styled(Layout)`
  position: absolute;
  top: 64px;
  right: 0;
  display: block;

  @media (min-width: 992px) {
    width: calc(100% - ${props => (props.iscollapsed ? '80px' : '250px')}) !important;
  }
`;

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 12px 0 12px;

  @media (min-width: 768px) {
    padding: 24px 24px 0 24px;
  }
  @media (min-width: 992px) {
    padding: 24px 48px 0 48px;
  }
`;

S.Content = styled(Content)`
  min-height: auto;
  //overflow: initial;
  //flex-grow: 1;
`;

export default S;
