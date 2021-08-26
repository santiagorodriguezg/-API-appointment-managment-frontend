import { Card, Layout } from 'antd';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import StyledCard from '../../styles/Card';

const PasswordResetDone = ({ location }) => {
  const { email } = (location && location.state) || {};
  return (
    <Layout.Content>
      <StyledCard.Container>
        <Card>
          <Logo />
          <StyledCard.Title>Restablecimiento de contraseña enviado</StyledCard.Title>
          <StyledCard.Text>
            Le hemos enviado un correo electrónico a <strong>{email}</strong> con las instrucciones para restablecer la
            contraseña.
          </StyledCard.Text>
          <StyledCard.Text>
            Si el correo electrónico no aparece en la bandeja de entrada, revisa las secciones de spam, importantes,
            entre otras.
          </StyledCard.Text>
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" href="/login" text="Inicio de sesión" />
          </div>
        </Card>
      </StyledCard.Container>
    </Layout.Content>
  );
};

export default PasswordResetDone;
