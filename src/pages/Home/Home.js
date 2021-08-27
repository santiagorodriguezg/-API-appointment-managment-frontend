import { useState } from 'react';
import { Layout } from 'antd';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

const { Footer, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const toggle = () => {
    setVisible(true);
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <NavBar collapsed={collapsed} toggle={toggle} showDrawer={showDrawer} />
      <Layout>
        <SideBar collapsed={collapsed} onClose={onClose} visible={visible} />

        <Layout>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
