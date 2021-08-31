import styled from 'styled-components';
import { PageHeader } from 'antd';
import Colors from '../../styles/Colors';

const S = {};

S.PageHeader = styled(PageHeader)`
  margin-top: 16px;
  padding-left: 0;
  padding-right: 0;

  .anticon-arrow-left:hover {
    color: ${Colors.primary};
  }
`;

export default S;
