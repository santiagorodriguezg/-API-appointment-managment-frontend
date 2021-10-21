import { List, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles/Variables';

const { Paragraph } = Typography;

const S = {};

S.Paragraph = styled(Paragraph)`
  margin: 0 !important;
  font-size: 14px;
  height: 44px;
`;

// User conversation

S.ListItem = styled(List.Item)`
  padding: 0;
  cursor: pointer;
  border: none !important;
  position: relative;

  &:hover {
    background-color: ${Colors.listItemColor};
  }

  &:active {
    background-color: ${Colors.listItemColorHover};
  }

  ${props =>
    props.$active &&
    css`
      background-color: ${Colors.listItemColorHover};

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 4px;
        background: ${Colors.primary};
      }
    `};
`;

S.ListItemMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-avatar {
    margin-right: 8px;
    padding: 12px 0 12px 12px;
  }

  .ant-list-item-meta-title {
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .ant-list-item-meta-content {
    padding: 12px 8px 12px 0;
    border-bottom: 1px solid #f0f0f0 !important;
  }
`;

S.ListItemMetaTitle = styled.div`
  max-width: 70%;
`;

S.ListItemMetaTime = styled.div`
  font-size: 70%;
`;

// Message

S.Message = styled.div`
  width: 100%;
  max-width: 60%;
  position: relative;
  margin-bottom: 12px;
  border-radius: 10px;
  padding: 4px 10px 7px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  word-wrap: break-word;
  float: right;
  background: #dcf8c6;

  &:before {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
    border: 0.6em solid transparent; /* arrow size */
    border-left-color: #dcf8c6; /* arrow color */
    right: -16px;
    bottom: 5px;
  }

  ${props =>
    props.receiver &&
    css`
      float: left;
      background: #ececec;

      &:before {
        border: 0.6em solid transparent; /* arrow size */
        border-right-color: #ececec; /* arrow color */
        left: -16px;
        top: 5px;
      }
    `};
`;

S.MessageText = styled.div`
  margin: 0;
  padding: 5px;
  word-wrap: break-word;
  font-size: 14px;
  padding-bottom: 0 !important;
`;

S.MessageTime = styled.div`
  margin: 0;
  margin-left: 50px !important;
  font-size: 12px;
  text-align: right;
  color: rgba(0, 0, 0, 0.55);
`;

export default S;
