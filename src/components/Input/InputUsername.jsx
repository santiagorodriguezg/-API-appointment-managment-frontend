import { Form, Input } from 'antd';

const InputUsername = ({ adminMsg }) => {
  const message = adminMsg ? 'Ingresa el usuario' : 'Ingresa tu usuario';
  const tooltip = adminMsg
    ? 'Una secuencia única de caracteres utilizada para identificar el usuario y permitirle el acceso al sistema'
    : null;

  return (
    <Form.Item
      name="username"
      label="Usuario"
      tooltip={tooltip}
      rules={[
        {
          required: true,
          message,
        },
        {
          whitespace: true,
          message,
        },
        {
          min: 3,
          message: 'Ingresa al menos 3 caracteres',
        },
      ]}
    >
      <Input maxLength={40} />
    </Form.Item>
  );
};

export default InputUsername;
