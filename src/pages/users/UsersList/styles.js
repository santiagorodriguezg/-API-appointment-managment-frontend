import { Descriptions, Typography } from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typography;

const S = {};

S.Descriptions = styled(Descriptions)`
  .ant-descriptions-title {
    font-size: initial;
    font-weight: 600;
  }

  .ant-descriptions-item-label {
    font-weight: 600;
  }
`;

S.Paragraph = styled(Paragraph)`
  display: flex;
  padding: 10px;
  background: rgba(150, 150, 150, 0.1);
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 3px;
  word-break: break-all;
`;

export default S;
