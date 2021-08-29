import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Form, Input, Layout, Row } from 'antd';

import { PasswordResetService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import StyledGlobal from '../../../styles/Global';

const PasswordReset = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onFinish = async values => {
    try {
      setLoading(true);
      const res = await PasswordResetService(values);

      if (!res.err) {
        setEmail(res.email);
        setRedirect(true);
      } else {
        setLoading(false);
        setError(false);
        setUserNotFound(res.data.detail);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
      setUserNotFound('');
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={400} center margin>
            <Logo />
            <StyledGlobal.TitleForm>Recuperación de cuenta</StyledGlobal.TitleForm>
            {error && <ErrorMessage />}
            {userNotFound !== '' && <Alert message={userNotFound} type="error" showIcon />}
            {redirect && (
              <Redirect
                to={{
                  pathname: '/password/reset/done',
                  state: { email },
                }}
              />
            )}
            <Form layout="vertical" name="password-reset" className="form-box" onFinish={onFinish} hideRequiredMark>
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
                <Button block text="Restablecer contraseña" type="primary" htmlType="submit" loading={loading} />
                <StyledGlobal.PForm>
                  Regresar al <Link to="/login">inicio de sesión</Link>
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
