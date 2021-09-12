import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Form, Input, Layout, Row, Button } from 'antd';

import { PasswordResetService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Alert from '../../../components/Alert';
import ErrorMessage from '../../../components/ErrorMessage';
import StyledGlobal from '../../../styles/Global';

const PasswordReset = () => {
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onFinish = async values => {
    try {
      setLoading(true);
      setErrorMsg(false);
      setUserNotFound('');

      const res = await PasswordResetService(values);

      setEmail(res.data.email);
      setRedirect(true);
    } catch (e) {
      if (e.response) {
        setLoading(false);
        setErrorMsg(false);
        setUserNotFound(e.response.data.detail);
      } else {
        setLoading(false);
        setErrorMsg(true);
        setUserNotFound('');
      }
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={400} center>
            <Logo />
            <StyledGlobal.TitleForm>Recuperación de cuenta</StyledGlobal.TitleForm>
            {errorMsg && <ErrorMessage />}
            {userNotFound !== '' && <Alert message={userNotFound} type="error" showIcon />}
            {redirect && (
              <Redirect
                to={{
                  pathname: '/accounts/password/reset/done',
                  state: { email },
                }}
              />
            )}
            <Form layout="vertical" name="password_reset" onFinish={onFinish} hideRequiredMark>
              <Form.Item
                name="username"
                label="Usuario"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese su nombre de usuario',
                  },
                ]}
              >
                <Input maxLength={40} />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" loading={loading} style={{ marginTop: 16 }}>
                  Restablecer contraseña
                </Button>
                <StyledGlobal.PForm>
                  Regresar al <Link to="/accounts/login">inicio de sesión</Link>
                </StyledGlobal.PForm>
              </Form.Item>
            </Form>
          </StyledGlobal.ContainerForm>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default PasswordReset;
