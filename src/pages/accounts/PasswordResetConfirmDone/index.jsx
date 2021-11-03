import Card from '../../../components/Card';
import CardStyles from '../../../components/Card/styles';
import StyledGlobal from '../../../styles/Global';
import Footer from '../../../components/Footer';

const PasswordResetConfirmDone = () => {
  return (
    <StyledGlobal.Wrapper style={{ height: '100%' }}>
      <StyledGlobal.WrapperContent>
        <Card title="Restablecimiento de contraseña completado">
          <CardStyles.Text>
            Tu contraseña ha sido cambiada. Ahora puedes seguir adelante e iniciar sesión.
          </CardStyles.Text>
        </Card>
      </StyledGlobal.WrapperContent>
      <Footer />
    </StyledGlobal.Wrapper>
  );
};

export default PasswordResetConfirmDone;
