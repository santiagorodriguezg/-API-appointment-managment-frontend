import { Badge, Typography } from 'antd';
import styled, { css } from 'styled-components';

const { Paragraph } = Typography;

const S = {};

S.Chip = styled(Badge)`
  border-radius: 20px;
  padding: 2px 5px;
  background: #ebebeb;

  display: flex;
  align-items: center;

  ${props =>
    props.$outlined &&
    css`
      border: 1px solid rgb(189, 189, 189);
      background: #fff;
    `};
`;

S.Label = styled(Paragraph)`
  width: calc(100% - 32px);
  padding: 0 3px;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 0 !important;
`;

export default S;
