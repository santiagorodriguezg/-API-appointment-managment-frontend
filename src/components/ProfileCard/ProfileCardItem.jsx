import { Col, Row } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import S from './styles';

const ProfileCardItem = ({ title, content, showIcon = true, ...props }) => {
  return (
    <S.ListItem {...props}>
      <Row>
        <Col xs={24} md={8}>
          <S.Title>{title}</S.Title>
        </Col>
        <Col xs={19} md={14}>
          <S.Content>{content}</S.Content>
        </Col>
        <Col xs={5} md={2}>
          {showIcon && (
            <S.Icon>
              <RightOutlined />
            </S.Icon>
          )}
        </Col>
      </Row>
    </S.ListItem>
  );
};

export default ProfileCardItem;
