import { Button as ButtonAntd } from 'antd';
import { StyledButton } from './styles';
import StyledGlobal from '../../styles/Global';

const Button = ({ text, ...props }) => {
  return <StyledButton {...props}>{text}</StyledButton>;
};

const ButtonCancelAndSave = ({ href }) => {
  return (
    <StyledGlobal.CancelAndSaveBtn>
      <ButtonAntd href={href} size="large" type="text">
        Cancelar
      </ButtonAntd>
      <Button text="Guardar" type="primary" size="large" htmlType="submit" />
    </StyledGlobal.CancelAndSaveBtn>
  );
};

export { ButtonCancelAndSave };
export default Button;
