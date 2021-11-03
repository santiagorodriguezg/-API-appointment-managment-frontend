import { Form, Input } from 'antd';

const OldPassword = ({ adminMsg }) => {
  const message = adminMsg ? 'Ingresa la contraseña actual' : 'Ingresa tu contraseña actual';
  return (
    <Form.Item
      name="password_old"
      label="Contraseña actual"
      rules={[
        {
          required: true,
          message,
        },
      ]}
    >
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

const NewPassword = ({ rules, adminMsg }) => {
  const message = adminMsg ? 'Ingresa la contraseña nueva' : 'Ingresa tu contraseña nueva';
  return (
    <Form.Item
      name="password"
      label="Contraseña nueva"
      rules={[
        {
          required: true,
          message,
        },
        ...rules,
      ]}
    >
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

const ConfirmPassword = ({ newConfirm, adminMsg }) => {
  const message = adminMsg
    ? `Confirma la contraseña ${newConfirm ? 'nueva' : ''}`
    : `Confirma tu contraseña ${newConfirm ? 'nueva' : ''}`;

  return (
    <Form.Item
      name="password2"
      label={`Confirmar contraseña ${newConfirm ? 'nueva' : ''}`}
      dependencies={['password']}
      rules={[
        {
          required: true,
          message,
        },
        {
          whitespace: true,
          message,
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
  );
};

const InputPassword = ({ requiredOnly, oldPassword, newPassword, confirmPassword, adminMsg }) => {
  const requiredMsg = adminMsg ? 'Ingresa la contraseña' : 'Ingresa tu contraseña';

  const rules = [
    {
      required: true,
      message: requiredMsg,
    },
    {
      min: 8,
      message: 'Ingresa una combinación que tenga al menos 8 caracteres',
    },
    {
      pattern: /(?=.*\d)(?=.*[a-zA-Z]).*/,
      message: 'La contraseña debe contener letras y números',
    },
  ];

  if (requiredOnly) rules.splice(1, 2);

  if (oldPassword) return <OldPassword adminMsg={adminMsg} />;

  if (newPassword) {
    rules.shift();
    return <NewPassword rules={rules} adminMsg={adminMsg} />;
  }

  if (confirmPassword) return <ConfirmPassword newConfirm={confirmPassword?.new} adminMsg={adminMsg} />;

  return (
    <Form.Item name="password" label="Contraseña" rules={rules}>
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

export default InputPassword;
