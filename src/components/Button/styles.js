import { Button } from 'antd';
import styled from 'styled-components';
import Colors from '../../styles/Colors';

export const StyledButton = styled(Button)`
  background: ${Colors.primary};
  width: 100%;
  border-color: ${Colors.primary};

  &:hover,
  &:focus {
    width: 100%;
    background: ${Colors.primaryHover};
    border-color: ${Colors.primaryHover};
  }
`;
