import crypto from 'crypto';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import { GetMyChatMessagesService } from '../../services/Chat';
import S from './styles';

const ListUserConversation = ({ data, loading, chatUser, setChatUser }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [room, setRoom] = useState('');

  const getMessages = async roomName => {
    try {
      const res = await GetMyChatMessagesService(user.username, roomName);
      console.log('RES', res.data);
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const onClick = async item => {
    console.log('EVE', item);
    setChatUser(item);
    // eslint-disable-next-line no-unused-vars
    const y = crypto.randomBytes(16).toString('hex');
    // const roomName = window.location.pathname.substring('/chat/'.length);
    // roomName = roomName === 'roomtest1' ? 'roomtest2' : 'roomtest1';
    // const roomName =
    history.push(`/chat/${item.roomName}`);
    setRoom('Hola');
    getMessages(item.roomName);
  };

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <S.ListItem $active={item.roomName === chatUser.roomName} onClick={() => onClick(item)}>
          <S.ListItemMeta
            avatar={<Avatar size={64} icon={<UserOutlined />} src={item.avatar} />}
            title={item.title}
            description={
              <S.Paragraph ellipsis={{ rows: 2 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. It is a long established
              </S.Paragraph>
            }
          />
        </S.ListItem>
      )}
    />
  );
};

export default ListUserConversation;
