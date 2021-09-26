import { Form, Input } from 'antd';

const InputUsername = () => {
  return (
    <Form.Item
      name="username"
      label="Usuario"
      rules={[
        {
          required: true,
          message: 'Ingresa tu usuario',
        },
        {
          whitespace: true,
          message: 'Ingresa tu usuario',
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
