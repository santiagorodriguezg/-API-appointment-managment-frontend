import styled from 'styled-components';

const S = {};

S.MessageList = styled.div`
  height: calc(100% - 115px);
  overflow-y: auto;
  padding: 16px;
  margin-bottom: 12px;
`;

S.MessagesEnd = styled.div`
  float: left;
  clear: both;
`;

export default S;
