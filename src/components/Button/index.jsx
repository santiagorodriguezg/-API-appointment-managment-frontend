import StyledGlobal from '../../styles/Global';
import { StyledButton, StyledButtonCenter } from './styles';

const Button = ({ children, center, ...props }) => {
  if (center) {
    return (
      <StyledButtonCenter>
        <StyledButton {...props}>{children}</StyledButton>
      </StyledButtonCenter>
    );
  }
  return <StyledButton {...props}>{children}</StyledButton>;
};

export const ButtonCancelAndSave = ({ loading, path }) => {
  return (
    <StyledGlobal.CancelAndSaveBtn>
      <StyledButton href={path} size="large" type="text">
        Cancelar
      </StyledButton>
      <StyledButton type="primary" size="large" htmlType="submit" loading={loading}>
        Guardar
      </StyledButton>
    </StyledGlobal.CancelAndSaveBtn>
  );
};

export const ButtonCancelAndSaveAccount = ({ loading }) => {
  return <ButtonCancelAndSave loading={loading} path="/accounts/profile" />;
};

export default Button;
