import { useState } from 'react';
import { Layout } from 'antd';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import S from './styles';

const { Footer } = Layout;

const Dashboard = ({ children }) => {
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
    <Layout>
      <NavBar collapsed={collapsed} toggle={toggle} showDrawer={showDrawer} />
      <S.Layout iscollapsed={collapsed ? 1 : 0}>
        <SideBar collapsed={collapsed} onClose={onClose} visible={visible} />
        <S.Container>
          <S.Content>{children}</S.Content>
          <Footer style={{ textAlign: 'center' }}>Casa de la Mujer ©2021 Created by Ant UED</Footer>
        </S.Container>
      </S.Layout>
    </Layout>
  );
};

export default Dashboard;
