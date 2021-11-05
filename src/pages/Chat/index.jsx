import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import TokenStorage from '../../config/TokenStorage';
import { GetMyChatsService } from '../../services/Chat';
import Dashboard from '../../components/Dashboard';
import Form from '../../components/Chat/Form';
import TitleBar from '../../components/Chat/TitleBar';
import MessageList from '../../components/Chat/MessageList';
import NoConversations from '../../components/Chat/NoConversations';
import ConversationList from '../../components/Chat/ConversationList';
import ConversationSearch from '../../components/Chat/ConversationSearch';
import DashboardStyles from '../../components/Dashboard/styles';
import StyledGlobal from '../../styles/Global';
import Styles from './styles';

const Chat = ({ location }) => {
  const history = useHistory();
  const { chatRoom } = (location && location.state) || {};
  const { user, setUser, chatUser, setChatUser } = useContext(AuthContext);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const roomName = location.pathname.substring('/chat/'.length);
  const chatResetURL = 'listing';

  const addMessage = msg => {
    if (msg instanceof Array) {
      setMessages(prev => [...prev, ...msg]);
    } else {
      setMessages(prev => [...prev, msg]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getChats = async () => {
    try {
      setLoadingChats(true);
      const chatList = [];
      const res = await GetMyChatsService(user.username);

      const { rooms } = res.data.results;
      let isOwner = chatRoom?.isNewChat || chatUser?.isNewChat || false;

      if (rooms.length) {
        setUser({ chat: true, ...user });
        rooms.forEach(chat => {
          if (roomName !== chatResetURL && roomName === chat.name) isOwner = true;
          chatList.push({
            roomName: chat.name,
            username: chat?.user_owner?.username || chat?.user_receiver?.username,
            title: chat?.user_owner?.full_name || chat?.user_receiver?.full_name,
            avatar: chat?.user_owner?.picture || chat?.user_receiver?.picture,
            description: chat.last_message.content,
            messageTime: chat.last_message.created_at,
          });
        });
      }

      if (roomName !== chatResetURL) {
        if (!isOwner) history.push(`/chat/${chatResetURL}`);
        if (chatRoom) {
          if (chatRoom.isNewChat) {
            chatList.unshift(chatRoom);
            setUser({ chat: true, ...user });
          }
          setChatUser(chatRoom);
        } else if (chatUser?.isNewChat) {
          chatList.unshift(chatUser);
        } else {
          setChatUser({ roomName, ...chatUser });
        }
      } else {
        if (chatUser?.isNewChat) chatList.unshift(chatUser);
        setChatUser({});
      }

      setChats(chatList);
      setLoadingChats(false);
    } catch (e) {
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
      const accessToken = TokenStorage.getAccessToken();
      const client = new WebSocket(`${process.env.REACT_APP_WS_URL}/${roomName}/?token=${accessToken}`);
      clientRef.current = client;

      client.onerror = e => console.error(e);

      client.onopen = () => {
        setLoadingMessages(true);
        // console.log('ws opened');
        client.send(JSON.stringify({ command: 'fetch_messages' }));
      };

      client.onclose = () => {
        if (clientRef.current) {
          // Connection failed
          // console.log('ws closed by server');
        } else {
          // Cleanup initiated from app side, can return here, to not attempt a reconnect
          // console.log('ws closed by app component unmount');
          return;
        }

        if (waitingToReconnect) {
          return;
        }
        // Parse event code and log
        // console.log('ws closed');

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

        // console.log('received message', data);
        if (data.command === 'fetch_messages') {
          addMessage(data.messages);
        } else if (data.command === 'create_message') {
          addMessage(data.message);
        }
        setLoadingMessages(false);
      };

      // eslint-disable-next-line consistent-return
      return () => {
        // console.log('Cleanup');
        // Dereference, so it will set up next time
        clientRef.current = null;

        client.close();
      };
    }
  }, [waitingToReconnect]);

  const renderChatList = () => {
    const lastMsg = messages[messages.length - 1];
    chats.map(chat => {
      if (chat.roomName === chatUser?.roomName) {
        chat.description = lastMsg?.content;
        chat.messageTime = lastMsg?.created_at;
        chatUser.title = chat.title;
        chatUser.username = chat.username;
      }
      return chat;
    });
    return <ConversationList data={chats} loading={loadingChats} chatUser={chatUser} setChatUser={setChatUser} />;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Dashboard>
      <StyledGlobal.Wrapper800>
        <DashboardStyles.Title level={3}>Chat</DashboardStyles.Title>
        {!user?.chat ? (
          <NoConversations user={user} />
        ) : (
          <Styles.ChatContainer>
            <Styles.ChatUserList>
              <Styles.ChatMessageTitleBar>
                <ConversationSearch user={user} />
              </Styles.ChatMessageTitleBar>
              {renderChatList()}
            </Styles.ChatUserList>

            <Styles.ChatMessageContainer>
              {roomName === chatResetURL ? (
                <Styles.SelectChatMessage>
                  <div>Selecciona un chat para comenzar</div>
                </Styles.SelectChatMessage>
              ) : (
                <>
                  <Styles.ChatMessageTitleBar>
                    <TitleBar chatUser={chatUser} />
                  </Styles.ChatMessageTitleBar>
                  <MessageList
                    messages={messages}
                    loadingMessages={loadingMessages}
                    messagesEndRef={messagesEndRef}
                    user={user}
                  />
                  <Form message={message} setMessage={setMessage} clientRef={clientRef} chatUser={chatUser} />
                </>
              )}
            </Styles.ChatMessageContainer>
          </Styles.ChatContainer>
        )}
      </StyledGlobal.Wrapper800>
    </Dashboard>
  );
};

export default Chat;
