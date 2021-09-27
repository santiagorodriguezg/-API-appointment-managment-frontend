import { Form, Input } from 'antd';

const InputIdentificationNumber = ({ required }) => {
  const rules = [
    {
      pattern: /^([0-9])*$/,
      message: 'Ingresa un número de identificación valido',
    },
  ];

  if (required) {
    rules.push({
      required: true,
      message: 'Ingresa tu número de identificación',
    });
  }

  return (
    <Form.Item name="identification_number" label="Número de identificación" rules={rules}>
      <Input minLength={6} maxLength={10} />
    </Form.Item>
  );
};

export default InputIdentificationNumber;
