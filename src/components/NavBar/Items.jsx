import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { DiffOutlined, HistoryOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { userRoles } from '../../config/utils/enums';
import S from './styles';

export const MenuItems = ({ user, ...props }) => {
  const location = useLocation();

  return (
    <S.DropdownMenu selectedKeys={[location.pathname]} {...props}>
      {user?.role !== userRoles[1].value && (
        <Menu.Item key="/appointments/create">
          <Link to="/appointments/create">
            <DiffOutlined /> Solicitar cita
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="/appointments/historic">
        <Link to="/appointments/historic">
          <HistoryOutlined /> Histórico de citas
        </Link>
      </Menu.Item>
    </S.DropdownMenu>
  );
};

export const UserMenu = ({ user }) => {
  return (
    <S.DropdownUserMenu>
      {user?.fullName && <Menu.Item key="name">{user.fullName}</Menu.Item>}
      <Menu.Divider />
      <Menu.Item key="/accounts/profile">
        <Link to="/accounts/profile">
          <UserOutlined /> Mi cuenta
        </Link>
      </Menu.Item>
      {user?.fullName ? (
        <Menu.Item key="/accounts/logout">
          <Link to="/accounts/logout">
            <LogoutOutlined /> Salir
          </Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="/accounts/login">
          <Link to="/accounts/login">
            <LoginOutlined /> Iniciar sesión
          </Link>
        </Menu.Item>
      )}
    </S.DropdownUserMenu>
  );
};
