import { useHistory } from 'react-router-dom';
import { Result } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { userRoles } from '../../../config/utils/enums';
import Button from '../../Button';

const NoConversations = ({ user }) => {
  const history = useHistory();

  return (
    <Result
      icon={<MessageOutlined />}
      title="Selecciona un usuario para iniciar una conversación en el chat"
      extra={
        user.role === userRoles[2].value ? (
          <Button type="primary" onClick={() => history.push('/contact')} ghost>
            Contacto
          </Button>
        ) : (
          <Button type="primary" onClick={() => history.push('/users')} ghost>
            Ver usuarios
          </Button>
        )
      }
    />
  );
};

export default NoConversations;
