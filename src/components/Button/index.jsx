import { Button as ButtonAntd } from 'antd';
import { StyledButton } from './styles';
import StyledGlobal from '../../styles/Global';

const Button = ({ text, ...props }) => {
  return <StyledButton {...props}>{text}</StyledButton>;
};

const ButtonCancelAndSave = ({ loading }) => {
  return (
    <StyledGlobal.CancelAndSaveBtn>
      <ButtonAntd onClick={() => window.history.back()} size="large" type="text">
        Cancelar
      </ButtonAntd>
      <Button loading={loading} text="Guardar" type="primary" size="large" htmlType="submit" />
    </StyledGlobal.CancelAndSaveBtn>
  );
};

export { ButtonCancelAndSave };
export default Button;
