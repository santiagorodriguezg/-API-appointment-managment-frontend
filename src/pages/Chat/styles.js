import styled from 'styled-components';
import Variables from '../../styles/Variables';

const S = {};

S.ChatContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(100vh - 290px);
  display: flex;
  background: #fff;
  box-shadow: ${Variables.boxShadowBase};
  border-radius: ${Variables.borderRadiusBase};
  margin-bottom: ${Variables.marginBase};
`;

S.ChatUserList = styled.div`
  width: 320px;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  overflow-x: hidden;
`;

S.ChatMessageContainer = styled.div`
  width: 480px;
`;

S.ChatMessageTitleBar = styled.div`
  padding: 0 12px;
  margin: 0;
  height: 44px;
  width: 100%;
  //background-color: #eee;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  .user-profile {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

export default S;
