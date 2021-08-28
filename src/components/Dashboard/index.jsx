import { useState } from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import S from './styles';

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
    <>
      <NavBar collapsed={collapsed} toggle={toggle} showDrawer={showDrawer} />
      <S.Container>
        <SideBar collapsed={collapsed} onClose={onClose} visible={visible} />
        <S.LeftContent iscollapsed={collapsed ? 1 : 0}>
          <S.Content>{children}</S.Content>
          <Footer />
        </S.LeftContent>
      </S.Container>
    </>
  );
};

export default Dashboard;
