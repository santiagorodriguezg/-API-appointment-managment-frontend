import { Button as ButtonAntd } from 'antd';
import StyledGlobal from '../../styles/Global';

const ButtonCancelAndSave = ({ loading }) => {
  return (
    <StyledGlobal.CancelAndSaveBtn>
      <ButtonAntd onClick={() => window.history.back()} size="large" type="text">
        Cancelar
      </ButtonAntd>
      <ButtonAntd type="primary" size="large" htmlType="submit" loading={loading}>
        Guardar
      </ButtonAntd>
    </StyledGlobal.CancelAndSaveBtn>
  );
};

export { ButtonCancelAndSave };
