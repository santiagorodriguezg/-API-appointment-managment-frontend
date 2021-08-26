import { Button } from 'antd';
import styled, { css } from 'styled-components';
import Colors from '../../styles/Colors';

export const StyledButton = styled(Button)`
  background: ${Colors.primary};
  border-color: ${Colors.primary};

  &:hover,
  &:focus {
    background: ${Colors.primaryHover};
    border-color: ${Colors.primaryHover};
  }

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;

      &:hover,
      &:focus {
        width: 100%;
      }
    `}
`;
