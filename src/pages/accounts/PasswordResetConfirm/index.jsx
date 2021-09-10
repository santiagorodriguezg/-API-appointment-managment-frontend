import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Col, Form, Input, Layout, Row } from 'antd';

import { PasswordResetCompleteService } from '../../../services/Auth';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import Alert from '../../../components/Alert';
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
      if (e.response) {
        setLoading(false);
        setErrorMsg(false);
        setErrorText(e.response.data.detail);
      } else {
        setLoading(false);
        setErrorMsg(true);
        setErrorText('');
      }
    }
  };

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <StyledGlobal.ContainerForm width={400} center margin>
            <Logo />
            <StyledGlobal.TitleForm>Cambiar contraseña</StyledGlobal.TitleForm>
            {errorText !== '' && <Alert message={errorText} type="error" showIcon />}
            {errorMsg && <ErrorMessage />}
            <Form layout="vertical" name="password_reset_confirm" onFinish={onFinish} hideRequiredMark>
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

              <Form.Item>
                <Button block text="Cambiar mi contraseña" type="primary" htmlType="submit" loading={loading} />
                <StyledGlobal.PForm>
                  <Link to="/accounts/password/reset">Solicitar un nuevo enlace</Link>
                </StyledGlobal.PForm>
              </Form.Item>
            </Form>
          </StyledGlobal.ContainerForm>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default PasswordResetConfirm;
