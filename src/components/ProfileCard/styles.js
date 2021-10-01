import { Card } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import Variables, { Colors } from '../../styles/Variables';

const S = {};

const sharedStylesListItem = css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

  &:hover {
    background-color: ${Colors.listItemColor};
  }

  &:active {
    background-color: ${Colors.listItemColorHover};
  }
`;

S.Card = styled(Card)`
  margin-bottom: ${Variables.marginBase};
  border-radius: ${Variables.borderRadiusBase};
  box-shadow: ${Variables.boxShadowBase};

  .ant-card-body > a:last-of-type {
    border-bottom: none;
  }
`;

S.ListItem = styled.a`
  display: block;
  text-decoration: none;
  padding: 20px;
  cursor: ${props => (props.href ? 'pointer' : 'default')};
  color: initial;
  ${sharedStylesListItem}
`;

S.Title = styled.p`
  margin: 0;
  color: #424242;
  font-weight: 600;
`;

S.Content = styled.p`
  margin: 0;
  color: initial;
`;

S.Icon = styled.div`
  text-align: center;
  color: initial;
`;

S.UploadPhoto = styled.div`
  position: relative;
  padding: 20px 20px 14px 20px;
  width: 100%;
  cursor: pointer;
  z-index: 1;

  ${sharedStylesListItem}
  & > p {
    position: absolute;
    top: 70px;
    left: 180px;
    z-index: -1;
  }

  .ant-upload {
    width: 100%;

    a {
      cursor: pointer;
    }
  }

  .ant-upload-list-item {
    margin: 8px 0;
    border: none;
    padding: 8px 25px 0 0;
  }

  .ant-progress-inner {
    margin-top: 16px;
  }
`;

S.Photo = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 120px;
    height: 30px;
  }
`;

S.IconCamera = styled(CameraOutlined)`
  color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  font-size: 24px;
`;

export default S;
