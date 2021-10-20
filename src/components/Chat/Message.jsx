import { getShortDate } from '../../config/utils';
import S from './styles';

const Message = ({ receiver, text, time }) => {
  const renderTimestamp = timestamp => {
    let prefix;
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime()) / 60000);
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = 'Justo ahora';
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `hace ${timeDiff} minutos`;
    } else {
      prefix = getShortDate(time);
    }
    return prefix;
  };

  return (
    <S.Message receiver={receiver}>
      <S.MessageText>{text}</S.MessageText>
      <S.MessageTime>{renderTimestamp(time)}</S.MessageTime>
    </S.Message>
  );
};

export default Message;
