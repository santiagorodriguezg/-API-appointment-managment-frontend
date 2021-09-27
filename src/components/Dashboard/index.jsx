import { useContext, useState } from 'react';
import { Affix } from 'antd';
import AuthContext from '../../context/Auth';
import StyledGlobal from '../../styles/Global';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';
import S from './styles';

const Dashboard = ({ children }) => {
  const { sideBarCollapsed, setSideBarCollapsed } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const toggle = () => {
    setVisible(true);
    setSideBarCollapsed(!sideBarCollapsed);
  };

  const onBreakpoint = broken => {
    if (broken) {
      setSideBarCollapsed(true);
    }
  };

  return (
    <>
      <Affix>
        <NavBar toggle={toggle} />
      </Affix>
      <SideBar collapsed={sideBarCollapsed} onClose={onClose} onBreakpoint={onBreakpoint} visible={visible} />
      <S.LeftContent $isCollapsed={sideBarCollapsed}>
        <StyledGlobal.WrapperContent>{children}</StyledGlobal.WrapperContent>
        <Footer />
      </S.LeftContent>
    </>
  );
};

export default Dashboard;
