import { Form, Input } from 'antd';

const OldPassword = () => {
  return (
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
  );
};

const NewPassword = ({ minRule, patternRule }) => {
  return (
    <Form.Item
      name="password"
      label="Contraseña nueva"
      rules={[
        {
          required: true,
          message: 'Ingrese su contraseña nueva',
        },
        minRule,
        patternRule,
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
          message: `Confirme su contraseña ${newConfirm ? 'nueva' : ''}`,
        },
        {
          whitespace: true,
          message: `Confirme su contraseña ${newConfirm ? 'nueva' : ''}`,
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

const InputPassword = ({ oldPassword, newPassword, confirmPassword }) => {
  const passwordMinRule = {
    min: 8,
    message: 'Asegúrese de que este campo tenga al menos 8 caracteres',
  };

  const passwordPatternRule = {
    pattern: /(?=.*\d)(?=.*[a-zA-Z]).*/,
    message: 'La contraseña debe contener letras y números',
  };

  if (oldPassword) {
    return <OldPassword />;
  }

  if (newPassword) {
    return <NewPassword minRule={passwordMinRule} patternRule={passwordPatternRule} />;
  }

  if (confirmPassword) {
    return <ConfirmPassword newConfirm={confirmPassword?.new} />;
  }

  return (
    <Form.Item
      name="password"
      label="Contraseña"
      rules={[
        {
          required: true,
          message: 'Ingrese su contraseña',
        },
        passwordMinRule,
        passwordPatternRule,
      ]}
    >
      <Input.Password maxLength={25} />
    </Form.Item>
  );
};

export default InputPassword;
