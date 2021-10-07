import { useContext } from 'react';
import { Avatar, Col, Dropdown, Row } from 'antd';
import { CaretDownOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import logo from '../../assets/logo.jpg';
import { MenuItems, UserMenu } from './Items';
import S from './styles';

const NavBar = ({ toggle }) => {
  const { user } = useContext(AuthContext);
  return (
    <S.Header>
      <Row>
        <Col xs={14} sm={4}>
          <S.LogoContainer>
            {toggle && <S.IconMenu onClick={toggle} />}
            <S.Logo href="/accounts/profile" title="Página principal">
              <img src={logo} alt="Casa de la Mujer UPTC" />
            </S.Logo>
          </S.LogoContainer>
        </Col>

        <Col xs={10} sm={20}>
          <S.NavContainer>
            <MenuItems mode="horizontal" expandIcon={<MoreOutlined />} />
            <Dropdown arrow overlay={<UserMenu fullName={user.fullName} />} trigger={['click']} placement="bottomRight">
              <S.UserMenu type="text">
                <Avatar icon={<UserOutlined />} src={user.picture} />
                <CaretDownOutlined />
              </S.UserMenu>
            </Dropdown>
          </S.NavContainer>
        </Col>
      </Row>
    </S.Header>
  );
};

export default NavBar;
