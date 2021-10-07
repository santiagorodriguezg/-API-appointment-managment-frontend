import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { DiffOutlined, HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import S from './styles';

export const MenuItems = props => {
  const location = useLocation();

  return (
    <S.DropdownMenu selectedKeys={[location.pathname]} {...props}>
      <Menu.Item key="/appointments/create">
        <Link to="/appointments/create">
          <DiffOutlined /> Solicitar cita
        </Link>
      </Menu.Item>
      <Menu.Item key="/appointments/historic">
        <Link to="/appointments/historic">
          <HistoryOutlined /> Histórico de citas
        </Link>
      </Menu.Item>
    </S.DropdownMenu>
  );
};

export const UserMenu = ({ fullName }) => {
  return (
    <S.DropdownUserMenu>
      <Menu.Item key="name">{fullName}</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/accounts/profile">
        <Link to="/accounts/profile">
          <UserOutlined /> Mi cuenta
        </Link>
      </Menu.Item>
      <Menu.Item key="/accounts/logout">
        <Link to="/accounts/logout">
          <LogoutOutlined /> Salir
        </Link>
      </Menu.Item>
    </S.DropdownUserMenu>
  );
};
