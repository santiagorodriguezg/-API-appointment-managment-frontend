import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Col, Form, Layout, Row } from 'antd';

import AuthContext from '../../../context/Auth';
import { LoginService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import InputUsername from '../../../components/Input/InputUsername';
import InputPassword from '../../../components/Input/InputPassword';
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
        access: res.data.access,
        refresh: res.data.refresh,
        user: {
          role: res.data.user.role,
          username: res.data.user.username,
          fullName: res.data.user.full_name,
          picture: res.data.user.picture,
        },
      });
      history.replace(from);
    } catch (e) {
      setLoading(false);
      if (e.response) {
        setErrorText(e.response.data.detail);
        setErrorMsg(false);
      } else {
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
              <InputUsername />

              <InputPassword requiredOnly />

              <Form.Item noStyle>
                <StyledGlobal.PForm>
                  <Link to="/accounts/password/reset">¿Has olvidado tu contraseña?</Link>
                </StyledGlobal.PForm>
                <Button block type="primary" htmlType="submit" loading={loading}>
                  Iniciar sesión
                </Button>
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
