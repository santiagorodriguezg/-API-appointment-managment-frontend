import Card from '../../../components/Card';
import S from '../../../components/Card/styles';

const PasswordResetDone = ({ location }) => {
  const { email } = (location && location.state) || {};
  return (
    <Card title="Restablecimiento de contraseña enviado">
      <S.Text>
        Le hemos enviado un correo electrónico a <strong>{email}</strong> con las instrucciones para restablecer la
        contraseña.
      </S.Text>
      <S.Text>
        Si el correo electrónico no aparece en la bandeja de entrada, revisa las secciones de spam, importantes, entre
        otras.
      </S.Text>
    </Card>
  );
};

export default PasswordResetDone;
