import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Input, Layout, Row } from 'antd';
import { SignupService } from '../../../services/Auth';
import useLocalStorage from '../../../libs/Storage';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import { getFieldErrors } from '../../../utils/Utils';
import StyledGlobal from '../../../styles/Global';

const Signup = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setToken] = useLocalStorage('token', '');

  const onFinish = async values => {
    try {
      console.log('Received values of form:', values);
      setLoading(true);
      const res = await SignupService(values);

      if (!res.err) {
        console.log('USER CREATED: ', res);
        setLoading(false);
        setToken(res.data.access);
      } else {
        setLoading(false);
        setError(false);
        form.setFields(getFieldErrors(res));
      }
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={600} center margin>
            <Logo />
            <StyledGlobal.TitleForm>Crear cuenta</StyledGlobal.TitleForm>
            {error && <ErrorMessage />}
            <Form layout="vertical" onFinish={onFinish}>
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
                  <Form.Item>
                    <div style={{ textAlign: 'center' }}>
                      <Button text="Registrarme" type="primary" htmlType="submit" loading={loading} />
                    </div>
                    <StyledGlobal.PForm>
                      ¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
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
