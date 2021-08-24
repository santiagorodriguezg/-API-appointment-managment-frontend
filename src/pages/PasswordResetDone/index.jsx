import { Card, Layout } from 'antd';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import { Container, Text, Title } from './styles';

const PasswordResetDone = ({ location }) => {
  const { email } = (location && location.state) || {};
  return (
    <Layout.Content>
      <Container>
        <Card>
          <Logo />
          <Title>Restablecimiento de contraseña enviado</Title>
          <Text>
            Le hemos enviado un correo electrónico a <strong>{email}</strong> con las instrucciones para restablecer la
            contraseña.
          </Text>
          <Text>
            Si el correo electrónico no aparece en la bandeja de entrada, revisa las secciones de spam, importantes,
            entre otras.
          </Text>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" href="/login" text="Inicio de sesión" style={{ width: 'initial' }} />
          </div>
        </Card>
      </Container>
    </Layout.Content>
  );
};

export default PasswordResetDone;
