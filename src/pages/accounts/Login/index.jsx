import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Col, Form, Input, Layout, Row } from 'antd';

import AuthContext from '../../../context/Auth';
import { LoginService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import StyledGlobal from '../../../styles/Global';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { logIn } = useContext(AuthContext);
  const [errorText, setErrorText] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const { from } = location.state || { from: { pathname: '/accounts/profile' } };

  const onFinish = async values => {
    try {
      setLoading(true);
      setErrorText('');
      setErrorMsg(false);

      const res = await LoginService(values);

      logIn({
        token: res.data.access,
        refresh: res.data.refresh,
        role: res.data.user.role,
        username: res.data.user.username,
        fullName: `${res.data.user.first_name} ${res.data.user.last_name}`,
      });
      history.replace(from);
    } catch (e) {
      if (e.response) {
        setLoading(false);
        setErrorText(e.response.data.detail);
        setErrorMsg(false);
      } else {
        setLoading(false);
        setErrorText('');
        setErrorMsg(true);
      }
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={400} center>
            <Logo />
            <StyledGlobal.TitleForm>Iniciar sesión</StyledGlobal.TitleForm>
            {errorText !== '' && <Alert message={errorText} type="error" showIcon />}
            {errorMsg && <ErrorMessage />}
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

              <Form.Item noStyle>
                <StyledGlobal.PForm>
                  <Link to="/accounts/password/reset">¿Has olvidado tu contraseña?</Link>
                </StyledGlobal.PForm>
              </Form.Item>

              <Form.Item>
                <Button block text="Iniciar sesión" type="primary" htmlType="submit" loading={loading} />
                <StyledGlobal.PForm>
                  ¿No tienes una cuenta? <Link to="/accounts/signup">Regístrate</Link>
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
