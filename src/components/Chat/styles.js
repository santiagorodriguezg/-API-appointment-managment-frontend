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

S.ChatItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.listItemColor};
  }

  &:active {
    background-color: ${Colors.listItemColorHover};
  }
`;

S.ChatItemAvatar = styled.div`
  margin-right: 8px;
  padding: 12px 0 12px 12px;
`;

S.ChatItemContent = styled.div`
  width: calc(100% - 84px);
  padding: 12px 8px 12px 0;
  border-bottom: 1px solid #f0f0f0 !important;
`;

S.ChatItemTitle = styled.h4`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;

  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 15px;
  line-height: 1.5715;
`;

S.ListItem = styled(List.Item)`
  padding: 0;
  cursor: pointer;
  border: none !important;

  &:hover {
    background-color: ${Colors.listItemColor};
  }

  &:active {
    background-color: ${Colors.listItemColorHover};
  }
`;

S.ListItemMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-avatar {
    margin-right: 8px;
    padding: 12px 0 12px 12px;
  }

  .ant-list-item-meta-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  .ant-list-item-meta-content {
    padding: 12px 8px 12px 0;
    border-bottom: 1px solid #f0f0f0 !important;
  }
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

  &:before {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
  }

  ${props =>
    props.receiver &&
    css`
      background: #ececec;

      &:before {
        border: 0.6em solid transparent; /* arrow size */
        border-right-color: #ececec; /* arrow color */
        left: -16px;
        top: 5px;
      }
    `};

  ${props =>
    props.sender &&
    css`
      float: right;
      background: #dcf8c6;

      &:before {
        border: 0.6em solid transparent; /* arrow size */
        border-left-color: #dcf8c6; /* arrow color */
        right: -16px;
        bottom: 5px;
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
