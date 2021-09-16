import { Form, Input } from 'antd';

const InputEmail = ({ required }) => {
  const rules = [
    {
      type: 'email',
      message: 'El correo electrónico ingresado no es válido',
    },
  ];

  if (required) {
    rules.push({
      required: true,
      message: 'El correo electrónico es obligatorio',
    });
  }

  return (
    <Form.Item name="email" label="Correo electrónico" rules={rules}>
      <Input maxLength={60} />
    </Form.Item>
  );
};

export default InputEmail;
