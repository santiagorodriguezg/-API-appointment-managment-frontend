import { SearchOutlined } from '@ant-design/icons';
import { userRoles } from '../../../config/utils/enums';
import Button from '../../Button';

const ConversationSearch = ({ user }) => {
  // return <Input.Search placeholder="Buscar un chat" />;
  const link = user.role !== userRoles[2].value ? '/users' : '/contact';

  return (
    <Button icon={<SearchOutlined />} style={{ width: '100%' }} href={link}>
      Buscar usuarios
    </Button>
  );
};

export default ConversationSearch;
