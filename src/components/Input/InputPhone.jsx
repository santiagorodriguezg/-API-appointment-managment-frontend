import { Form, Input } from 'antd';

const InputPhone = ({ required }) => {
  const rules = [
    {
      pattern: /^3[0-9]{2} ?[0-9]{3} ?[0-9]{4}$/,
      message: 'Ingresa un número de teléfono valido',
    },
  ];

  if (required) {
    rules.push({
      required: true,
      message: 'Ingresa tu número de teléfono',
    });
  }

  return (
    <Form.Item name="phone" label="Teléfono" rules={rules}>
      <Input maxLength={12} />
    </Form.Item>
  );
};

export default InputPhone;
