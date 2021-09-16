import { Form, Input } from 'antd';

const InputUsername = () => {
  return (
    <Form.Item
      name="username"
      label="Usuario"
      rules={[
        {
          required: true,
          message: 'Ingrese su usuario',
        },
        {
          whitespace: true,
          message: 'Ingrese su usuario',
        },
        {
          min: 3,
          message: 'Asegúrese de que este campo tenga al menos 3 caracteres',
        },
      ]}
    >
      <Input maxLength={40} />
    </Form.Item>
  );
};

export default InputUsername;
