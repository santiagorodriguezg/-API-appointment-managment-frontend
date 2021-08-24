import { Card, Layout } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import Logo from '../../components/Logo';
import { Container, Text, Title } from './styles';

const PasswordResetDone = props => {
  const { email } = (props.location && props.location.state) || {};
  return (
    <Layout.Content>
      <Container>
        <Card>
          <Logo />
          <Title>Restablecimiento de contraseña enviado</Title>
          <Text>
            Le hemos enviado un correo electrónico a<strong>{email}</strong> con las instrucciones para restablecer la
            contraseña. Debería recibirlas en breve.
          </Text>
          <Text>
            Si el correo electrónico no aparece en la bandeja de entrada, revisa las secciones de spam, importantes,
            entre otras.
          </Text>
          Regresar al <Link to="/login">inicio de sesión</Link>.
        </Card>
      </Container>
    </Layout.Content>
  );
};

export default PasswordResetDone;
