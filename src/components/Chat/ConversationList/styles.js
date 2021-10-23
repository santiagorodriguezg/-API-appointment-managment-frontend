import styled, { css } from 'styled-components';
import { List, Typography } from 'antd';
import { Colors } from '../../../styles/Variables';

const { Paragraph } = Typography;

const S = {};

S.Paragraph = styled(Paragraph)`
  margin: 0 !important;
  font-size: 14px;
  height: 44px;
`;

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

export default S;
