import { Card, Layout } from 'antd';

import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
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
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" href="/accounts/login" text="Iniciar sesión" />
          </div>
        </Card>
      </StyledCard.Container>
    </Layout.Content>
  );
};

export default PasswordResetConfirmDone;
