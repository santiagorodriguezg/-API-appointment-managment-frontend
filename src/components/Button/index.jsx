import { useHistory } from 'react-router-dom';
import StyledGlobal from '../../styles/Global';
import { StyledButton, StyledButtonCenter } from './styles';

const Button = ({ children, center, ...props }) => {
  const renderButton = () => {
    return <StyledButton {...props}>{children}</StyledButton>;
  };

  return center ? <StyledButtonCenter>{renderButton()}</StyledButtonCenter> : renderButton();
};

export const ButtonCancelAndSave = ({ loading, path }) => {
  const history = useHistory();

  return (
    <StyledGlobal.CancelAndSaveBtn>
      <StyledButton size="large" type="text" onClick={() => history.push(path)}>
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
