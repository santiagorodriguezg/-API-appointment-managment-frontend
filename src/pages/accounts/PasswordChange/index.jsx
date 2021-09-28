import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Divider, Form, Typography } from 'antd';
import { PasswordChangeService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSaveAccount } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import InputPassword from '../../../components/Input/InputPassword';
import DashboardPageAccount from '../../../components/Dashboard/DashboardPageAccount';

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
      setBtnLoading(false);
      if (e.response) {
        setErrorMsg(false);
        form.setFields(getFieldErrors(e.response.data.errors));
      } else {
        setErrorMsg(true);
      }
    }
  };

  return redirect ? (
    <Redirect
      to={{
        pathname: '/accounts/profile',
        state: {
          successMsg: 'Su contraseña se actualizo correctamente',
        },
      }}
    />
  ) : (
    <DashboardPageAccount title="Contraseña">
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
              <ButtonCancelAndSaveAccount loading={btnLoading} />
            </Form.Item>
          </Form>
        </>
      )}
    </DashboardPageAccount>
  );
};
export default PasswordChange;
