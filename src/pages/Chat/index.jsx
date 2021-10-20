/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Input, Spin, Tooltip } from 'antd';
import { EllipsisOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import { GetMyChatsService } from '../../services/Chat';
import TokenStorage from '../../config/TokenStorage';
import Dashboard from '../../components/Dashboard';
import Message from '../../components/Chat/Message';
import ListUserConversation from '../../components/Chat/ListUserConversation';
import S from '../../components/Dashboard/styles';
import StyledGlobal from '../../styles/Global';
import Styled from './styles';

const Chat = () => {
  const { user, chatUser, setChatUser } = useContext(AuthContext);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const accessToken = TokenStorage.getAccessToken();

  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function addMessage(msg) {
    if (msg instanceof Array) {
      setMessages(prev => [...prev, ...msg]);
    } else {
      setMessages(prev => [...prev, msg]);
    }
  }

  const onChange = e => {
    if (e.target.value !== ' ') setMessage(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getChats = async () => {
    try {
      setLoadingChats(true);
      const res = await GetMyChatsService(user.username);
      console.log('RES', res.data.results);

      const chatList = [];

      res.data.results.rooms.forEach(chat => {
        chatList.push({
          id: chat.id,
          roomName: chat.name,
          username: chat?.user_owner?.username || chat?.user_receiver?.username,
          title: chat?.user_owner?.full_name || chat?.user_receiver?.full_name,
          avatar: chat?.user_owner?.picture || chat?.user_receiver?.picture,
        });
      });

      setChats(chatList);
      setLoadingChats(false);
    } catch (e) {
      console.log('ERROR', e);
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    getChats();

    if (waitingToReconnect) {
      return;
    }

    // Only set up the websocket once
    if (!clientRef.current) {
      const roomName = window.location.pathname.substring('/chat/'.length);
      const client = new WebSocket(`ws://localhost:8000/ws/v1/chat/${roomName}/?token=${accessToken}`);
      clientRef.current = client;

      // window.client = client;

      client.onerror = e => console.error(e);

      client.onopen = () => {
        setLoadingMessages(true);
        setIsOpen(true);
        console.log('ws opened');
        client.send(JSON.stringify({ command: 'fetch_messages' }));
      };

      client.onclose = () => {
        if (clientRef.current) {
          // Connection failed
          console.log('ws closed by server');
        } else {
          // Cleanup initiated from app side, can return here, to not attempt a reconnect
          console.log('ws closed by app component unmount');
          return;
        }

        if (waitingToReconnect) {
          return;
        }
        // Parse event code and log
        setIsOpen(false);
        console.log('ws closed');

        // Setting this will trigger a re-run of the effect,
        // cleaning up the current websocket, but not setting
        // up a new one right away
        setWaitingToReconnect(true);

        // This will trigger another re-run, and because it is false,
        // the socket will be set up again
        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = msg => {
        const data = JSON.parse(msg.data);

        console.log('received message', data);
        if (data.command === 'fetch_messages') {
          addMessage(data.messages);
        } else if (data.command === 'create_message') {
          addMessage(data.message);
        }
        setLoadingMessages(false);
      };

      // eslint-disable-next-line consistent-return
      return () => {
        console.log('Cleanup');
        // Dereference, so it will set up next time
        clientRef.current = null;

        client.close();
      };
    }
  }, [waitingToReconnect]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (clientRef.current) {
      if (message.trim()) {
        clientRef.current.send(
          JSON.stringify({
            command: 'create_message',
            data: {
              room_name: window.location.pathname.substring('/chat/'.length),
              user_receiver: chatUser.username,
              content: message.trim(),
            },
          }),
        );
      }
      setMessage('');
    }
  };

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

            <ListUserConversation data={chats} loading={loadingChats} chatUser={chatUser} setChatUser={setChatUser} />
          </Styled.ChatUserList>

          <Styled.ChatMessageContainer>
            <Styled.ChatMessageTitleBar>
              <div className="user-profile">
                <Styled.Paragraph ellipsis strong>
                  {chatUser.title}
                </Styled.Paragraph>
              </div>
              <EllipsisOutlined />
            </Styled.ChatMessageTitleBar>

            <Styled.ChatMessageList>
              <Spin spinning={loadingMessages}>
                {messages.map(msg => (
                  <Message
                    key={msg.id}
                    receiver={msg.user !== user.username}
                    text={msg.content}
                    time={msg.created_at}
                  />
                ))}
                <Styled.MessagesEnd ref={messagesEndRef} />
              </Spin>
            </Styled.ChatMessageList>

            <Styled.ChatMessageReply>
              <Tooltip title="Emojis">
                <Button size="large" icon={<SmileOutlined />} />
              </Tooltip>
              <Input.TextArea
                autoSize={{
                  minRows: 1,
                }}
                size="large"
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={onChange}
              />
              <Tooltip title="Enviar">
                <Button size="large" icon={<SendOutlined />} onClick={sendMessage} disabled={message === ''} />
              </Tooltip>
            </Styled.ChatMessageReply>
          </Styled.ChatMessageContainer>
        </Styled.ChatContainer>
      </StyledGlobal.Wrapper800>
    </Dashboard>
  );
};

export default Chat;
