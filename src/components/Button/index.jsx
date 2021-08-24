import { StyledButton } from './styles';

const Button = ({ props, text }) => {
  return <StyledButton {...props}>{text}</StyledButton>;
};

export default Button;
