import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Input, Layout, Row } from 'antd';

import { LoginService } from '../../services/Auth';
import useLocalStorage from '../../libs/Storage';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Alert from '../../components/Alert';
import ErrorMessage from '../../components/ErrorMessage';
import StyledGlobal from '../../styles/Global';

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setToken] = useLocalStorage('token', '');

  const onFinish = async values => {
    try {
      console.log('Received values of form: ', values);
      setLoading(true);

      const res = await LoginService(values);

      if (!res.err) {
        console.log('TODO BIEN', res);
        setErrorMsg('');
        setToken(res.access);
      } else {
        console.log('ERROR', res);
        setLoading(false);
        setError(false);
        setErrorMsg(res.data.detail);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
      setErrorMsg('');
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm>
            <Logo />
            <StyledGlobal.TitleForm>Iniciar sesión</StyledGlobal.TitleForm>
            {errorMsg !== '' && <Alert message={errorMsg} type="error" showIcon />}
            {error && <ErrorMessage />}
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
                <Input maxLength={40} />
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
                <Input.Password maxLength={25} />
              </Form.Item>

              <StyledGlobal.PForm>
                <Link to="/password/reset">¿Olvido su contraseña?</Link>
              </StyledGlobal.PForm>

              <Form.Item>
                <Button text="Iniciar sesión" type="primary" htmlType="submit" loading={loading} fullWidth />
                <StyledGlobal.PForm>
                  ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
                </StyledGlobal.PForm>
              </Form.Item>
            </Form>
          </StyledGlobal.ContainerForm>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Login;
