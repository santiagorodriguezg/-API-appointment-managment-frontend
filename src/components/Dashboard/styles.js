import { Typography } from 'antd';
import styled, { css } from 'styled-components';
import Colors from '../../styles/Colors';

const { Title } = Typography;
const S = {};

S.LeftContent = styled.div`
  float: right;
  height: calc(100% - 64px);
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 992px) {
    width: calc(100% - ${props => (props.$isCollapsed ? '80px' : '250px')}) !important;
  }
`;

S.Content = styled.div`
  flex-grow: 1;
  background: ${Colors.bgBody};
  padding: 0 12px;

  @media (min-width: 768px) {
    padding: 0 24px;
  }
  @media (min-width: 992px) {
    padding: 0 48px;
  }
`;

S.Title = styled(Title)`
  margin: 24px 0 !important;
  ${props =>
    props.$center &&
    css`
      text-align: center;
    `};
`;

export default S;
