import S from './styles';

const Message = ({ sender, receiver, text, time }) => {
  return (
    <S.Message sender={sender} receiver={receiver}>
      <S.MessageText>{text}</S.MessageText>
      <S.MessageTime>{time}</S.MessageTime>
    </S.Message>
  );
};

export default Message;
