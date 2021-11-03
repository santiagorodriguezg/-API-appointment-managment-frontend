import { Form, Input } from 'antd';

const InputLastName = ({ adminMsg }) => {
  const message = adminMsg ? 'Ingresa los apellidos' : 'Ingresa tus apellidos';
  return (
    <Form.Item
      name="last_name"
      label="Apellidos"
      rules={[
        {
          required: true,
          message,
        },
        {
          whitespace: true,
          message,
        },
      ]}
    >
      <Input maxLength={50} />
    </Form.Item>
  );
};

export default InputLastName;
