import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { PasswordResetCompleteService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import ErrorMessage from '../../../components/ErrorMessage';
import InputPassword from '../../../components/Input/InputPassword';
import Footer from '../../../components/Footer';
import StyledGlobal from '../../../styles/Global';

const PasswordResetConfirm = () => {
  const params = useParams();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try {
      setLoading(true);
      setErrorMsg(false);
      setErrorText('');

      await PasswordResetCompleteService({ ...values, ...params });
      history.push('/accounts/password/reset/complete');
    } catch (e) {
      setLoading(false);
      if (e.response) {
        setErrorMsg(false);
        setErrorText(e.response.data.detail);
      } else {
        setErrorMsg(true);
        setErrorText('');
      }
    }
  };

  return (
    <StyledGlobal.Wrapper style={{ height: '100%' }}>
      <StyledGlobal.WrapperContent>
        <StyledGlobal.ContainerForm width={400} center margin shadow>
          <Logo />
          <StyledGlobal.TitleForm>Cambiar contraseña</StyledGlobal.TitleForm>
          {errorText !== '' && <Alert message={errorText} type="error" showIcon />}
          {errorMsg && <ErrorMessage />}
          <Form layout="vertical" name="password_reset_confirm" onFinish={onFinish} hideRequiredMark>
            <InputPassword />
            <InputPassword confirmPassword />
            <Form.Item>
              <Button block $marginTop type="primary" htmlType="submit" loading={loading}>
                Cambiar mi contraseña
              </Button>
              <StyledGlobal.PForm>
                <Link to="/accounts/password/reset">Solicitar un nuevo enlace</Link>
              </StyledGlobal.PForm>
            </Form.Item>
          </Form>
        </StyledGlobal.ContainerForm>
      </StyledGlobal.WrapperContent>
      <Footer />
    </StyledGlobal.Wrapper>
  );
};

export default PasswordResetConfirm;
