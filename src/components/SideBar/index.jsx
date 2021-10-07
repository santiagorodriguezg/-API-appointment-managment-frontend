import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DiffOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import { userRoles } from '../../config/utils/enums';
import S from './styles';

const MenuItems = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <S.Menu theme="light" mode="inline" selectedKeys={[location.pathname]}>
      <Menu.SubMenu key="/appointments" icon={<DiffOutlined />} title="Citas">
        <Menu.Item key="/appointments/create">
          <Link to="/appointments/create">Solicitar</Link>
        </Menu.Item>
        <Menu.Item key="/appointments/historic">
          <Link to="/appointments/historic">Histórico</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="/chat/listing" icon={<MessageOutlined />}>
        <Link to="/chat/listing">Chat</Link>
      </Menu.Item>
      {user.role !== userRoles[2].value && (
        <Menu.Item key="/users" icon={<UsergroupAddOutlined />}>
          <Link to="/users">Usuarios</Link>
        </Menu.Item>
      )}
      <Menu.Item key="/accounts/profile" icon={<UserOutlined />}>
        <Link to="/accounts/profile">Mi cuenta</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<InfoCircleOutlined />}>
        Contacto
      </Menu.Item>
    </S.Menu>
  );
};

const SideBar = ({ collapsed, visible, onClose, onBreakpoint }) => {
  return (
    <>
      <S.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        breakpoint="xl"
        width={250}
        onBreakpoint={onBreakpoint}
      >
        <MenuItems />
      </S.Sider>

      <S.Drawer
        placement="left"
        closable={false}
        bodyStyle={{ padding: 0 }}
        title="Casa de la Mujer UPTC"
        onClose={onClose}
        visible={visible}
      >
        <MenuItems />
      </S.Drawer>
    </>
  );
};

export default SideBar;
