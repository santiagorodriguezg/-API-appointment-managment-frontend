import { Avatar, Col, Dropdown, Row } from 'antd';
import { CaretDownOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';

import { MobileAndBelow, Tablet } from '../../styles/MediaQuery';
import { MenuItems, UserMenu } from './Items';
import S from './styles';

const NavBar = ({ toggle }) => {
  return (
    <S.Header>
      <Row>
        <Col xs={14} sm={10} lg={8}>
          <S.LogoContainer>
            {toggle && <S.IconMenu onClick={toggle} />}
            <S.Logo>
              <span>Casa de la Mujer</span>
            </S.Logo>
          </S.LogoContainer>
        </Col>

        <Col xs={10} sm={14} lg={16}>
          <S.NavContainer>
            <Tablet>
              <MenuItems mode="horizontal" />
            </Tablet>
            <MobileAndBelow>
              <Dropdown arrow overlay={<MenuItems />} trigger={['click']} placement="bottomRight">
                <S.ButtonMoreOutlined type="text">
                  <MoreOutlined />
                </S.ButtonMoreOutlined>
              </Dropdown>
            </MobileAndBelow>

            <Dropdown arrow overlay={<UserMenu />} trigger={['click']} placement="bottomRight">
              <S.UserMenu type="text">
                <Avatar icon={<UserOutlined />} /> <CaretDownOutlined />
              </S.UserMenu>
            </Dropdown>
          </S.NavContainer>
        </Col>
      </Row>
    </S.Header>
  );
};

export default NavBar;
