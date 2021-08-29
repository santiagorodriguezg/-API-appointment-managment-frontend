import { useState } from 'react';
import { Affix } from 'antd';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';
import S from './styles';

const Dashboard = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const toggle = () => {
    setVisible(true);
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Affix>
        <NavBar toggle={toggle} />
      </Affix>
      <SideBar collapsed={collapsed} onClose={onClose} visible={visible} />
      <S.LeftContent $isCollapsed={collapsed}>
        <S.Content>{children}</S.Content>
        <Footer />
      </S.LeftContent>
    </>
  );
};

export { default as DashboardPageEdit } from './DashboardPageEdit';
export default Dashboard;
