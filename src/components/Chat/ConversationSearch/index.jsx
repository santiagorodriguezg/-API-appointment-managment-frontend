import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { userRoles } from '../../../config/utils/enums';
import Button from '../../Button';

const ConversationSearch = ({ user }) => {
  // return <Input.Search placeholder="Buscar un chat" />;
  const history = useHistory();
  const link = user.role !== userRoles[2].value ? '/users' : '/contact';

  return (
    <Button icon={<SearchOutlined />} style={{ width: '100%' }} onClick={() => history.push(link)}>
      Buscar usuarios
    </Button>
  );
};

export default ConversationSearch;
