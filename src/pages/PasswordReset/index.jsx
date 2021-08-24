import { Alert, Col, Form, Input, Layout, Row } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import { PasswordResetService } from '../../services/Auth';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userNotFound, setUserNotFound] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onFinish = async values => {
    console.log('VALUES', values);
    setLoading(true);
    const res = await PasswordResetService(values);

    if (!res.err) {
      console.log('TODO BIEN', res);
      setEmail(res.email);
      setRedirect(true);
    } else {
      console.log('ERROR', res);
      setLoading(false);
      setUserNotFound(res.data.detail);
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <Logo />
          <div className="wrapper-form">
            <h2>Recuperación de cuenta</h2>
            {userNotFound !== '' && <Alert message={userNotFound} type="error" showIcon />}
            {redirect && (
              <Redirect
                to={{
                  pathname: '/password-reset/done',
                  state: { email },
                }}
              />
            )}
            <Form layout="vertical" name="login" className="form-box" onFinish={onFinish} hideRequiredMark>
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
                <Input />
              </Form.Item>

              <Form.Item>
                <Button text="Restablecer contraseña" type="primary" htmlType="submit" loading={loading} />
                <Link to="/login">Iniciar sesión</Link>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default PasswordReset;
