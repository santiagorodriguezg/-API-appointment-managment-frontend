import { StyledButton } from './styles';

const Button = ({ text, ...props }) => {
  return <StyledButton {...props}>{text}</StyledButton>;
};

export default Button;
