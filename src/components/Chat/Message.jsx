import S from './styles';

const Message = ({ sender, receiver }) => {
  return (
    <S.Message sender={sender} receiver={receiver}>
      <S.MessageText>Hola</S.MessageText>
      <S.MessageTime>28/09/21 a.m</S.MessageTime>
    </S.Message>
  );
};

export default Message;
