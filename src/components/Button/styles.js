import { Button } from 'antd';
import styled from 'styled-components';
import Colors from '../../styles/Colors';

export const StyledButton = styled(Button)`
  background: ${Colors.primary};
  border-color: ${Colors.primary};
  margin-top: 24px;

  &:hover,
  &:focus {
    background: ${Colors.primaryHover};
    border-color: ${Colors.primaryHover};
  }
`;
