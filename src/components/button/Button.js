import { StyledButton } from './Button.component'

const Button = ({ text, ...props }) => {
  return (
    <StyledButton {...props} >{text}</StyledButton>
  )
}

export default Button
