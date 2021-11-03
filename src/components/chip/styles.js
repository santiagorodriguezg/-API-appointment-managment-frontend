import { Badge, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles/Variables';

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
      //border: 1px solid rgb(189, 189, 189);
      border: 1px solid rgba(${Colors.primaryRGB}, 0.3);
      background: #fff;
    `};

  ${props =>
    props.$href &&
    css`
      &:hover {
        background: rgba(${Colors.primaryRGB}, 0.15);
      }
    `};
`;

S.Link = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
`;

S.Label = styled(Paragraph)`
  width: calc(100% - 32px);
  padding: 0 3px;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 0 !important;
`;

export default S;
