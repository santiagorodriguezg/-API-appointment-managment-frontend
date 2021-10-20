import { Typography } from 'antd';
import styled from 'styled-components';
import Variables from '../../styles/Variables';

const { Paragraph } = Typography;

const S = {};

S.Paragraph = styled(Paragraph)`
  margin: 0 !important;
`;

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
  width: 330px;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  overflow-x: hidden;
`;

S.ChatMessageContainer = styled.div`
  width: 500px;
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

S.ChatMessageList = styled.div`
  height: calc(100% - 115px);
  overflow-y: auto;
  padding: 16px;
  margin-bottom: 12px;
`;

S.ChatMessageReply = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #f6f6f6;
  padding: 10px 5px 10px 5px;

  textarea {
    width: 100%;
    resize: none;
    overflow: hidden;
    outline: none;
    text-indent: 5px;
    box-shadow: none;
    height: 40px !important;
    max-height: 40px !important;
    margin: 0 8px;

    &:focus {
      text-indent: 5px;
      box-shadow: none;
    }
  }
`;

S.MessagesEnd = styled.div`
  float: left;
  clear: both;
`;

export default S;
