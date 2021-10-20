import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import S from './styles';

const UserConversation = ({ name, avatar, onClick }) => {
  // const history = useHistory();

  // const onClick = item => {
  //   console.log('EVE', item);
  //   // eslint-disable-next-line no-unused-vars
  //   const y = crypto.randomBytes(16).toString('hex');
  //   let roomName = window.location.pathname.substring('/chat/'.length);
  //   roomName = roomName === 'roomtest1' ? 'roomtest2' : 'roomtest1';
  //   history.push(`/chat/${roomName}`);
  //   // setRoom('Hola');
  //   // getMessages(roomName);
  // };

  return (
    <S.ChatItem onClick={onClick}>
      <S.ChatItemAvatar>
        <Avatar size={64} icon={<UserOutlined />} src={avatar} />
      </S.ChatItemAvatar>
      <S.ChatItemContent>
        <S.ChatItemTitle>{name}</S.ChatItemTitle>
        <S.Paragraph ellipsis={{ rows: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, debitis earum incidunt ipsa iste, iusto
          maxime modi nemo possimus quae qui sapiente sed similique sint tempora tenetur totam ullam, vero.
        </S.Paragraph>
      </S.ChatItemContent>
    </S.ChatItem>
  );
};

export default UserConversation;
