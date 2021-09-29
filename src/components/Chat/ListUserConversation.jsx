import { Avatar, List } from 'antd';
import S from './styles';

const ListUserConversation = () => {
  const data = [
    {
      title: 'Luis Guillermo Gómez',
    },
    {
      title: 'Sofia Garcia',
    },
    {
      title: 'Juan Carlos Perez',
    },
    {
      title: 'Ana María Hernández',
    },
  ];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <S.ListItem>
          <S.ListItemMeta
            avatar={<Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="https://ant.design">{item.title}</a>}
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
