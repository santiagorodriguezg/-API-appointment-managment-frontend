import styled from 'styled-components';
import Colors from '../../styles/Colors';

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
  padding: 24px 12px 0 12px;

  @media (min-width: 768px) {
    padding: 24px 24px 0 24px;
  }
  @media (min-width: 992px) {
    padding: 24px 48px 0 48px;
  }
`;

export default S;
