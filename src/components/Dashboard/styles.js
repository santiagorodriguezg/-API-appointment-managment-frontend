import styled from 'styled-components';
import Colors from '../../styles/Colors';

const S = {};

S.Container = styled.div`
  min-width: 100%;
  position: relative;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - 64px);
`;

S.LeftContent = styled.div`
  float: right;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 992px) {
    width: calc(100% - ${props => (props.iscollapsed ? '80px' : '250px')}) !important;
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
