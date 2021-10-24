import { useHistory } from 'react-router-dom';
import { Avatar, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import S from './styles';

const ConversationList = ({ data, loading, chatUser, setChatUser }) => {
  const history = useHistory();

  const renderTimestamp = timestamp => {
    let prefix = '';
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime()) / 60000);
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = 'Justo ahora';
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = new Date(timestamp)
        .toLocaleDateString('es-co', {
          hour: 'numeric',
          minute: 'numeric',
        })
        .split(',')[1];
    } else {
      prefix = new Date(timestamp).toLocaleDateString('es-co');
    }
    return prefix;
  };

  const onClick = item => {
    setChatUser(item);
    history.push(`/chat/${item.roomName}`);
  };

  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <S.ListItem $active={item.roomName === chatUser?.roomName} onClick={() => onClick(item)}>
          <S.ListItemMeta
            avatar={<Avatar size={64} icon={<UserOutlined />} src={item.avatar} />}
            title={
              <>
                <S.ListItemMetaTitle>{item.title}</S.ListItemMetaTitle>
                <S.ListItemMetaTime>{item.messageTime && renderTimestamp(item.messageTime)}</S.ListItemMetaTime>
              </>
            }
            description={<S.Paragraph ellipsis={{ rows: 2 }}>{item.description}</S.Paragraph>}
          />
        </S.ListItem>
      )}
    />
  );
};

export default ConversationList;
