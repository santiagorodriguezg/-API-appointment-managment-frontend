import styled from 'styled-components';
import Variables, { Colors } from '../../../styles/Variables';

const S = {};

S.MessageList = styled.div`
  height: calc(100% - 115px);
  overflow-y: auto;
  padding: 16px;
  margin-bottom: 12px;
`;

S.MessageEmpty = styled.div`
  padding: 10px;
  background: rgba(${Colors.primaryRGB}, 0.15);
  border-radius: ${Variables.borderRadiusBase};
  font-weight: 600;
  font-size: 85%;
`;

S.MessagesEnd = styled.div`
  float: left;
  clear: both;
`;

export default S;
