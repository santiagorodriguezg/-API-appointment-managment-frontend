import { Divider, Form, Input, Typography } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';

const { Title, Paragraph } = Typography;

const PasswordChange = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit title="Contraseña">
      <Title level={5}>Seguridad de la contraseña</Title>
      <Paragraph>
        Utilice 8 caracteres como mínimo incluyendo números y letras en mayúsculas y minúsculas. No use términos comunes
        o demasiado obvios como el nombre de su mascota, número de celular o su nombre, así como contraseñas de otros
        sitios.
      </Paragraph>
      <Divider />
      <Form layout="vertical" name="passwordChange" onFinish={onFinish} hideRequiredMark>
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
          <AccountsButtonCancelAndSave />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default PasswordChange;
