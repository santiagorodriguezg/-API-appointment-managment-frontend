import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { DiffOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import S from './styles';

export const MenuItems = props => {
  return (
    <S.DropdownMenu {...props}>
      <Menu.Item key="/appointments/create">
        <Link to="/appointments/create">
          <DiffOutlined /> Solicitar cita
        </Link>
      </Menu.Item>
    </S.DropdownMenu>
  );
};

export const UserMenu = () => {
  const { name } = useContext(AuthContext);

  return (
    <S.DropdownUserMenu>
      <Menu.Item key="name">{name}</Menu.Item>
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
