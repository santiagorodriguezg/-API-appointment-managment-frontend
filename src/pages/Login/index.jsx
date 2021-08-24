import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Alert, Col, Form, Input, Layout, Row } from 'antd';

import useLocalStorage from '../../libs/Storage';
import { LoginService } from '../../services/Auth';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import './Login.css';

const Login = () => {
  const [, setToken] = useLocalStorage('token', '');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const onFinish = async values => {
    console.log('Received values of form: ', values);
    setLoading(true);

    const res = await LoginService(values);
    if (!res.err) {
      console.log('TODO BIEN', res);
      setLoginError('');
      setToken(res.access);
    } else {
      console.log('ERROR', res);
      setLoading(false);
      setLoginError(res.data.detail);
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <Logo />
          <div className="wrapper-form">
            <h2>Iniciar sesión</h2>
            {loginError !== '' && <Alert message={loginError} type="error" showIcon />}
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

              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese su contraseña',
                  },
                ]}
              >
                <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>

              <Form.Item>
                <Link to="/password-reset">¿Olvido su contraseña?</Link>
              </Form.Item>

              <Form.Item>
                <Button text="Iniciar sesión" type="primary" htmlType="submit" loading={loading} />
                ¿No tienes una cuenta?
                <Link to="/signup">Registrate</Link>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Login;
