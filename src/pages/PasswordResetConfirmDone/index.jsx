import { Card, Layout } from 'antd';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Container, Text, Title } from '../PasswordResetDone/styles';

const PasswordResetConfirmDone = () => {
  return (
    <Layout.Content>
      <Container>
        <Card>
          <Logo />
          <Title>Restablecimiento de contraseña completado</Title>
          <Text>Tu contraseña ha sido cambiada. Ahora puedes seguir adelante e iniciar sesión.</Text>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" href="/login" text="Iniciar sesión" style={{ width: 'initial' }} />
          </div>
        </Card>
      </Container>
    </Layout.Content>
  );
};

export default PasswordResetConfirmDone;
