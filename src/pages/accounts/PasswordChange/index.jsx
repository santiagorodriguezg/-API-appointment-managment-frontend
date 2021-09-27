import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Divider, Form, Typography } from 'antd';
import { PasswordChangeService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSave } from '../../../components/Button';
import DashboardPageEdit from '../../../components/Dashboard/DashboardPageEdit';
import ErrorMessage from '../../../components/ErrorMessage';
import InputPassword from '../../../components/Input/InputPassword';

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
            <InputPassword oldPassword />

            <InputPassword newPassword />

            <InputPassword confirmPassword={{ new: true }} />

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
