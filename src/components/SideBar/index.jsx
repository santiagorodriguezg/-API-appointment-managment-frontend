import { Link, useLocation } from 'react-router-dom';
import { Drawer, Menu } from 'antd';
import { DiffOutlined, MessageOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { MobileAndBelow, Tablet } from '../../styles/MediaQuery';
import S from './styles';

const { SubMenu } = Menu;

const SideBar = ({ collapsed, onClose, visible }) => {
  const location = useLocation();

  return (
    <>
      <Tablet>
        <S.Sider trigger={null} collapsible collapsed={collapsed} theme="light" breakpoint="xl" width={250}>
          <div className="logo" />
          <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} defaultOpenKeys={['/appointments']}>
            <SubMenu key="/appointments" icon={<DiffOutlined />} title="Citas">
              <Menu.Item key="/appointments/create">
                <Link to="/appointments/create">Solicitar</Link>
              </Menu.Item>
              <Menu.Item key="/appointments/historic">
                <Link to="/appointments/historic">Histórico</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<MessageOutlined />}>
              Chat
            </Menu.Item>
            <Menu.Item key="/accounts/profile" icon={<UserOutlined />}>
              <Link to="/accounts/profile">Mi cuenta</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageOutlined />}>
              Contacto
            </Menu.Item>
          </Menu>
        </S.Sider>
      </Tablet>

      <MobileAndBelow>
        <Drawer
          placement="left"
          closable={false}
          bodyStyle={{ padding: 0 }}
          title="Casa de la Mujer"
          onClose={onClose}
          visible={visible}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Drawer>
      </MobileAndBelow>
    </>
  );
};

export default SideBar;
