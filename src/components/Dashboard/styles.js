import { Typography } from 'antd';
import styled, { css } from 'styled-components';

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

S.Title = styled(Title)`
  margin: 24px 0 !important;
  ${props =>
    props.$center &&
    css`
      text-align: center;
    `};
`;

export default S;
