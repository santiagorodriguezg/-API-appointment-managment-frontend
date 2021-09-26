import { Form, Input } from 'antd';

const InputEmail = ({ required }) => {
  const rules = [
    {
      type: 'email',
      message: 'Ingresa un correo electrónico válido',
    },
  ];

  if (required) {
    rules.push({
      required: true,
      message: 'Ingresa tu correo electrónico',
    });
  }

  return (
    <Form.Item name="email" label="Correo electrónico" rules={rules}>
      <Input maxLength={60} />
    </Form.Item>
  );
};

export default InputEmail;
