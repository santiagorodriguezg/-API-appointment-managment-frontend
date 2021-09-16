import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Form, Input, Layout, Row, Select } from 'antd';

import AuthContext from '../../../context/Auth';
import { SignupService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';
import StyledGlobal from '../../../styles/Global';
import { getFieldErrors } from '../../../config/utils';
import { identificationTypes } from '../../../config/utils/enums';
import InputNumber from '../../../components/Input/InputNumber';

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
        token: res.data.access,
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
                  <Form.Item
                    name="first_name"
                    label="Nombre"
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese su nombre',
                      },
                      {
                        whitespace: true,
                        message: 'Ingrese su nombre',
                      },
                    ]}
                  >
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="last_name"
                    label="Apellidos"
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese sus apellidos',
                      },
                      {
                        whitespace: true,
                        message: 'Ingrese sus apellidos',
                      },
                    ]}
                  >
                    <Input maxLength={50} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="identification_type"
                    label="Tipo de identificación"
                    rules={[
                      {
                        required: true,
                        message: 'Seleccione el tipo de identificación',
                      },
                    ]}
                  >
                    <Select placeholder="Seleccione un tipo de identificación">
                      {identificationTypes.map(obj => (
                        <Select.Option key={obj.value} value={obj.value}>
                          {obj.text}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="identification_number"
                    label="Número de identificación"
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese su número de identificación',
                      },
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="username"
                    label="Usuario"
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese su usuario',
                      },
                      {
                        whitespace: true,
                        message: 'Ingrese su usuario',
                      },
                    ]}
                  >
                    <Input maxLength={40} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Correo electrónico"
                    rules={[
                      {
                        type: 'email',
                        message: 'El correo electrónico ingresado no es válido',
                      },
                    ]}
                  >
                    <Input maxLength={60} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                      {
                        required: true,
                        message: 'Ingrese su contraseña',
                      },
                      {
                        min: 8,
                        message: 'Asegúrese de que este campo tenga al menos 8 caracteres',
                      },
                      {
                        pattern: /(?=.*\d)(?=.*[a-zA-Z]).*/,
                        message: 'La contraseña debe contener letras y números',
                      },
                    ]}
                  >
                    <Input.Password maxLength={25} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="password2"
                    label="Confirmar contraseña"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'Confirme su contraseña',
                      },
                      {
                        whitespace: true,
                        message: 'Confirme su contraseña',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Las dos contraseñas ingresadas no coinciden'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
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
