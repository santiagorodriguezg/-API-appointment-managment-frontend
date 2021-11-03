import { Typography } from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typography;

const S = {};

S.Paragraph = styled(Paragraph)`
  display: flex;
  padding: 10px;
  background: rgba(150, 150, 150, 0.1);
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 3px;
  word-break: break-all;
`;

S.Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default S;
