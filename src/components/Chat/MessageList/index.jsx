import { Spin } from 'antd';
import Message from '../Message';
import S from './styles';

const MessageList = ({ messages, loadingMessages, messagesEndRef, user }) => {
  return (
    <S.MessageList>
      <Spin spinning={loadingMessages}>
        {messages.length ? (
          messages.map(msg => (
            <Message key={msg.id} receiver={msg.user !== user.username} text={msg.content} time={msg.created_at} />
          ))
        ) : (
          <S.MessageEmpty>Envía un mensaje...</S.MessageEmpty>
        )}
        <S.MessagesEnd ref={messagesEndRef} />
      </Spin>
    </S.MessageList>
  );
};

export default MessageList;
