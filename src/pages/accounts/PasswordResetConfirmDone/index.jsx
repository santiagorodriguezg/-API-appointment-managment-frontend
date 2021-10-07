import Card from '../../../components/Card';
import S from '../../../components/Card/styles';

const PasswordResetConfirmDone = () => {
  return (
    <Card title="Restablecimiento de contraseña completado">
      <S.Text>Tu contraseña ha sido cambiada. Ahora puedes seguir adelante e iniciar sesión.</S.Text>
    </Card>
  );
};

export default PasswordResetConfirmDone;
