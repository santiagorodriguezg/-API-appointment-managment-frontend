import crypto from 'crypto';
import { useHistory } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import S from './styles';

const UserConversation = () => {
  const history = useHistory();

  const onClick = e => {
    console.log('EVE', e);
    const x = crypto.randomBytes(16).toString('hex');
    history.push(`/chat/${x}`);
  };

  return (
    <S.ChatItem onClick={onClick}>
      <S.ChatItemAvatar>
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </S.ChatItemAvatar>
      <S.ChatItemContent>
        <S.ChatItemTitle>Usuario 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit</S.ChatItemTitle>
        <S.Paragraph ellipsis={{ rows: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, debitis earum incidunt ipsa iste, iusto
          maxime modi nemo possimus quae qui sapiente sed similique sint tempora tenetur totam ullam, vero.
        </S.Paragraph>
      </S.ChatItemContent>
    </S.ChatItem>
  );
};

export default UserConversation;
