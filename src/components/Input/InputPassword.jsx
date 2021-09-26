import { Form, Input } from 'antd';

const OldPassword = () => {
  return (
    <Form.Item
      name="password_old"
      label="Contraseña actual"
      rules={[
        {
          required: true,
          message: 'Ingresa tu contraseña actual',
        },
      ]}
    >
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

const NewPassword = ({ rules }) => {
  return (
    <Form.Item
      name="password"
      label="Contraseña nueva"
      rules={[
        {
          required: true,
          message: 'Ingresa tu contraseña nueva',
        },
        ...rules,
      ]}
    >
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

const ConfirmPassword = ({ newConfirm }) => {
  return (
    <Form.Item
      name="password2"
      label={`Confirmar contraseña ${newConfirm ? 'nueva' : ''}`}
      dependencies={['password']}
      rules={[
        {
          required: true,
          message: `Confirma tu contraseña ${newConfirm ? 'nueva' : ''}`,
        },
        {
          whitespace: true,
          message: `Confirma tu contraseña ${newConfirm ? 'nueva' : ''}`,
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

const InputPassword = ({ requiredOnly, oldPassword, newPassword, confirmPassword }) => {
  const rules = [
    {
      required: true,
      message: 'Ingresa tu contraseña',
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

  if (oldPassword) return <OldPassword />;

  if (newPassword) {
    rules.shift();
    return <NewPassword rules={rules} />;
  }

  if (confirmPassword) return <ConfirmPassword newConfirm={confirmPassword?.new} />;

  return (
    <Form.Item name="password" label="Contraseña" rules={rules}>
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

export default InputPassword;
