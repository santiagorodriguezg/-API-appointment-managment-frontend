import { Form, Input } from 'antd';

const InputEmail = ({ required, adminMsg }) => {
  const requiredMsg = adminMsg ? 'Ingresa el correo electrónico' : 'Ingresa tu correo electrónico';

  const rules = [
    {
      type: 'email',
      message: 'Ingresa un correo electrónico válido',
    },
  ];

  if (required) {
    rules.push({
      required: true,
      message: requiredMsg,
    });
  }

  return (
    <Form.Item name="email" label="Correo electrónico" rules={rules}>
      <Input maxLength={60} />
    </Form.Item>
  );
};

export default InputEmail;
