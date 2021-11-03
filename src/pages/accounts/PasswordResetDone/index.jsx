import Card from '../../../components/Card';
import ContactInfo from '../../../components/ContactInfo';
import CardStyles from '../../../components/Card/styles';
import StyledGlobal from '../../../styles/Global';
import Footer from '../../../components/Footer';

const PasswordResetDone = ({ location }) => {
  const { data } = (location && location.state) || {};
  return (
    <StyledGlobal.Wrapper style={{ height: '100%' }}>
      <StyledGlobal.WrapperContent>
        {!data?.send_email || !data.email ? (
          <Card title="Información de contacto">
            <CardStyles.Text>Para restablecer tu cuenta comunícate con nosotros a través de:</CardStyles.Text>
            <ContactInfo />
          </Card>
        ) : (
          <Card title="Restablecimiento de contraseña enviado">
            <CardStyles.Text>
              Le hemos enviado un correo electrónico a <strong>{data.email}</strong> con las instrucciones para
              restablecer la contraseña.
            </CardStyles.Text>
            <CardStyles.Text>
              Si el correo electrónico no aparece en la bandeja de entrada, revisa las secciones de spam, importantes,
              entre otras.
            </CardStyles.Text>
          </Card>
        )}
      </StyledGlobal.WrapperContent>
      <Footer />
    </StyledGlobal.Wrapper>
  );
};

export default PasswordResetDone;
