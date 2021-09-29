import { Button, Input, Tooltip } from 'antd';
import { EllipsisOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import Dashboard from '../../components/Dashboard';
import ListUserConversation from '../../components/Chat/ListUserConversation';
import S from '../../components/Dashboard/styles';
import StyledGlobal from '../../styles/Global';
import Styled from './styles';
import Message from '../../components/Chat/Message';

const ChatList = () => {
  return (
    <Dashboard>
      <StyledGlobal.Wrapper800>
        <S.Title level={3}>Chat</S.Title>
        <Styled.ChatContainer>
          <Styled.ChatUserList>
            <Styled.ChatMessageTitleBar>
              <div style={{ margin: '8px 12px' }}>
                <Input.Search placeholder="Buscar un chat" />
              </div>
            </Styled.ChatMessageTitleBar>
            <ListUserConversation />
          </Styled.ChatUserList>

          <Styled.ChatMessageContainer>
            <Styled.ChatMessageTitleBar>
              <div className="user-profile">
                <Styled.Paragraph ellipsis strong>
                  Luis Guillermo Gómez Galeano
                </Styled.Paragraph>
              </div>
              <EllipsisOutlined />
            </Styled.ChatMessageTitleBar>
            <Styled.ChatMessageList>
              <Message sender />
              <Message receiver />
              <Message sender />
              <Message receiver />
              <Message receiver />
              <Message sender />
              <Message sender />
              <Message sender />
              <Message receiver />
              <Message receiver />
              <Message sender />
            </Styled.ChatMessageList>
            <Styled.ChatMessageReply>
              <Tooltip title="Emojis">
                <Button size="large" icon={<SmileOutlined />} />
              </Tooltip>
              <Input.TextArea
                autoSize={{
                  minRows: 1,
                  maxRows: 6,
                }}
                placeholder="Escribe un mensaje..."
                size="large"
              />
              <Tooltip title="Enviar">
                <Button size="large" icon={<SendOutlined />} />
              </Tooltip>
            </Styled.ChatMessageReply>
          </Styled.ChatMessageContainer>
        </Styled.ChatContainer>
      </StyledGlobal.Wrapper800>
    </Dashboard>
  );
};

export default ChatList;
