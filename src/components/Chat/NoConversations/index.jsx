import { Result } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import Button from '../../Button';

const NoConversations = () => {
  return (
    <Result
      icon={<MessageOutlined />}
      title="Selecciona un usuario para iniciar una conversación en el chat"
      extra={
        <Button type="primary" href="/users" ghost>
          Ver usuarios
        </Button>
      }
    />
  );
};

export default NoConversations;
