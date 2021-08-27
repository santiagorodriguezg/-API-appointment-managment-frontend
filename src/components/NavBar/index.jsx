import { Avatar, Col, Dropdown, Row } from 'antd';
import { DownOutlined, MenuOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';

import { MobileAndBelow, Tablet } from '../../styles/MediaQuery';
import { MenuItems, UserMenu } from './Items';
import S from './styles';

const NavBar = ({ toggle }) => {
  return (
    <S.Header>
      <Row>
        <Col xs={14} sm={10} lg={8}>
          <S.LogoContainer>
            <S.IconMenu shape="circle" type="text" onClick={toggle}>
              <MenuOutlined />
            </S.IconMenu>
            <S.Logo>
              <span>Casa de la Mujer</span>
            </S.Logo>
          </S.LogoContainer>
        </Col>

        <Col xs={10} sm={14} lg={16}>
          <S.NavContainer>
            <Tablet>
              <MenuItems mode="horizontal" style={{ width: 'auto' }} />
            </Tablet>
            <MobileAndBelow>
              <Dropdown overlay={MenuItems} trigger={['click']} placement="bottomRight">
                <S.ButtonMoreOutlined type="text" onClick={e => e.preventDefault()}>
                  <MoreOutlined />
                </S.ButtonMoreOutlined>
              </Dropdown>
            </MobileAndBelow>

            <Dropdown overlay={UserMenu} trigger={['click']} placement="bottomRight">
              <S.UserMenu type="text" onClick={e => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} /> <DownOutlined />
              </S.UserMenu>
            </Dropdown>
          </S.NavContainer>
        </Col>
      </Row>
    </S.Header>
  );
};

export default NavBar;
