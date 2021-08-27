import { Drawer, Layout, Menu } from 'antd';
import { DiffOutlined, MessageOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { MobileAndBelow, Tablet } from '../../styles/MediaQuery';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = ({ collapsed, onClose, visible }) => {
  return (
    <>
      <Tablet>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light" breakpoint="xl" width={250}>
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="appointment" icon={<DiffOutlined />} title="Citas">
              <Menu.Item key="appointmentCreate">Solicitar</Menu.Item>
              <Menu.Item key="appointmentList">Histórico</Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<MessageOutlined />}>
              Chat
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Perfil
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageOutlined />}>
              Contacto
            </Menu.Item>
          </Menu>
        </Sider>
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
