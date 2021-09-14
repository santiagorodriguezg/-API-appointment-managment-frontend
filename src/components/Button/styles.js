import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  margin-top: ${props => (props.$marginTop ? `16px` : 0)};
`;

export const StyledButtonCenter = styled.div`
  text-align: center;
`;
