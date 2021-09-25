import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Form, Layout, Row } from 'antd';
import AuthContext from '../../../context/Auth';
import { SignupService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';
import StyledGlobal from '../../../styles/Global';
import { getFieldErrors } from '../../../config/utils';
import { identificationTypes } from '../../../config/utils/enums';
import InputIdentificationNumber from '../../../components/Input/InputIdentificationNumber';
import InputFirstName from '../../../components/Input/InputFirstName';
import InputLastName from '../../../components/Input/InputLastName';
import InputIdentificationType from '../../../components/Input/InputIdentificationType';
import InputUsername from '../../../components/Input/InputUsername';
import InputEmail from '../../../components/Input/InputEmail';
import InputPassword from '../../../components/Input/InputPassword';

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { logIn } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    try {
      setErrorMsg(false);
      setLoading(true);

      const res = await SignupService(values);

      setLoading(false);
      logIn({
        access: res.data.access,
        refresh: res.data.refresh,
        role: res.data.user.role,
        username: res.data.user.username,
        fullName: res.data.user.full_name,
      });
      history.push('/accounts/profile');
    } catch (e) {
      if (e.response) {
        setLoading(false);
        setErrorMsg(false);
        form.setFields(getFieldErrors(e.response.data.errors));
      } else {
        setLoading(false);
        setErrorMsg(true);
      }
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={600} center>
            <Logo />
            <StyledGlobal.TitleForm>Crear cuenta</StyledGlobal.TitleForm>
            {errorMsg && <ErrorMessage />}
            <Form
              form={form}
              name="signup"
              layout="vertical"
              requiredMark="optional"
              initialValues={{
                identification_type: identificationTypes[0].value,
              }}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputFirstName />
                </Col>

                <Col xs={24} md={12}>
                  <InputLastName />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputIdentificationType />
                </Col>

                <Col xs={24} md={12}>
                  <InputIdentificationNumber />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputUsername />
                </Col>

                <Col xs={24} md={12}>
                  <InputEmail />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputPassword />
                </Col>

                <Col xs={24} md={12}>
                  <InputPassword confirmPassword />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item noStyle>
                    <Button center $marginTop type="primary" htmlType="submit" loading={loading}>
                      Registrarme
                    </Button>
                    <StyledGlobal.PForm>
                      ¿Ya tienes cuenta? <Link to="/accounts/login">Ingresa aquí</Link>
                    </StyledGlobal.PForm>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </StyledGlobal.ContainerForm>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default Signup;
