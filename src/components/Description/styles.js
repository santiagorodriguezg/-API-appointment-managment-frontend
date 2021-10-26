import styled from 'styled-components';
import { Descriptions } from 'antd';

const S = {};

S.Descriptions = styled(Descriptions)`
  .ant-descriptions-title {
    font-size: initial;
    font-weight: 600;
  }

  .ant-descriptions-item-label {
    font-weight: 600;
  }

  .ant-descriptions-item-container {
    align-items: center;
  }
`;

export default S;
