import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Divider, Form, Input, Typography } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import { PasswordChangeService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import ErrorMessage from '../../../components/ErrorMessage';

const { Title, Paragraph } = Typography;

const PasswordChange = () => {
  const [form] = Form.useForm();
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const onFinish = async values => {
    try {
      setBtnLoading(true);

      await PasswordChangeService(values);

      setRedirect(true);
    } catch (e) {
      if (e.response) {
        setBtnLoading(false);
        setErrorMsg(false);
        form.setFields(getFieldErrors(e.response.data.errors));
      } else {
        setBtnLoading(false);
        setErrorMsg(true);
      }
    }
  };

  return (
    <DashboardPageEdit title="Contraseña">
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su contraseña se actualizo correctamente',
            },
          }}
        />
      )}
      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <>
          <Title level={5}>Seguridad de la contraseña</Title>
          <Paragraph>
            Utilice 8 caracteres como mínimo incluyendo números y letras en mayúsculas y minúsculas. No use términos
            comunes o demasiado obvios como el nombre de su mascota, número de celular o su nombre, así como contraseñas
            de otros sitios.
          </Paragraph>
          <Divider />
          <Form form={form} layout="vertical" name="password_change" onFinish={onFinish} hideRequiredMark>
            <Form.Item
              name="password_old"
              label="Contraseña actual"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su contraseña actual',
                },
              ]}
            >
              <Input.Password maxLength={25} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña nueva"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su contraseña nueva',
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
              label="Confirmar contraseña nueva"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Confirme su contraseña nueva',
                },
                {
                  whitespace: true,
                  message: 'Confirme su contraseña nueva',
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
              <ButtonCancelAndSave loading={btnLoading} />
            </Form.Item>
          </Form>
        </>
      )}
    </DashboardPageEdit>
  );
};
export default PasswordChange;