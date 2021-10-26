import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Form, Layout, Row } from 'antd';
import { PasswordResetService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import InputUsername from '../../../components/Input/InputUsername';
import StyledGlobal from '../../../styles/Global';

const PasswordReset = () => {
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState('');
  const [data, setData] = useState('');
  const [redirect, setRedirect] = useState(false);

  const onFinish = async values => {
    try {
      setLoading(true);
      setErrorMsg(false);
      setUserNotFound('');

      const res = await PasswordResetService(values);

      setData(res.data);
      setRedirect(true);
    } catch (e) {
      if (e.response) {
        setErrorMsg(false);
        setUserNotFound(e.response.data.detail);
      } else {
        setErrorMsg(true);
        setUserNotFound('');
      }
      setLoading(false);
    }
  };

  return redirect ? (
    <Redirect
      to={{
        pathname: '/accounts/password/reset/done',
        state: { data },
      }}
    />
  ) : (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={400} center>
            <Logo />
            <StyledGlobal.TitleForm>Recuperación de cuenta</StyledGlobal.TitleForm>
            {errorMsg && <ErrorMessage />}
            {userNotFound !== '' && <Alert message={userNotFound} type="error" showIcon />}
            <Form layout="vertical" name="password_reset" onFinish={onFinish} hideRequiredMark>
              <InputUsername />

              <Form.Item noStyle>
                <Button block $marginTop type="primary" htmlType="submit" loading={loading}>
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
