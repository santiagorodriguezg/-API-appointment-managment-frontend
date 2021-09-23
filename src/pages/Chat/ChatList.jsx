import Dashboard from '../../components/Dashboard';
import S from '../../components/Dashboard/styles';
import StyledGlobal from '../../styles/Global';

const ChatList = () => {
  return (
    <Dashboard>
      <StyledGlobal.Wrapper800>
        <S.Title level={3}>Chat</S.Title>
      </StyledGlobal.Wrapper800>
    </Dashboard>
  );
};

export default ChatList;
