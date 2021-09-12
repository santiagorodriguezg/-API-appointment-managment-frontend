import { Card, Layout, Button } from 'antd';

import Logo from '../../../components/Logo';
import StyledCard from '../../../styles/Card';

const PasswordResetConfirmDone = () => {
  return (
    <Layout.Content>
      <StyledCard.Container>
        <Card>
          <Logo />
          <StyledCard.Title>Restablecimiento de contraseña completado</StyledCard.Title>
          <StyledCard.Text>
            Tu contraseña ha sido cambiada. Ahora puedes seguir adelante e iniciar sesión.
          </StyledCard.Text>
          <StyledCard.Button>
            <Button type="primary" href="/accounts/login">
              Iniciar sesión
            </Button>
          </StyledCard.Button>
        </Card>
      </StyledCard.Container>
    </Layout.Content>
  );
};

export default PasswordResetConfirmDone;
