import Card from '../../../components/Card';
import CardStyles from '../../../components/Card/styles';

const PasswordResetConfirmDone = () => {
  return (
    <Card title="Restablecimiento de contraseña completado">
      <CardStyles.Text>Tu contraseña ha sido cambiada. Ahora puedes seguir adelante e iniciar sesión.</CardStyles.Text>
    </Card>
  );
};

export default PasswordResetConfirmDone;
