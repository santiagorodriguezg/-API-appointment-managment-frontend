import { Menu } from 'antd';
import { DiffOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import S from './styles';

export const MenuItems = props => {
  return (
    <S.DropdownMenu {...props}>
      <Menu.Item key="mail">
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          <DiffOutlined /> Solicitar cita
        </a>
      </Menu.Item>
    </S.DropdownMenu>
  );
};

export const UserMenu = (
  <S.DropdownMenu>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        <UserOutlined /> Perfil
      </a>
    </Menu.Item>
    <Menu.Item key="2">
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        <LogoutOutlined /> Salir
      </a>
    </Menu.Item>
  </S.DropdownMenu>
);
