import { Form, Input } from 'antd';

const InputLastName = () => {
  return (
    <Form.Item
      name="last_name"
      label="Apellidos"
      rules={[
        {
          required: true,
          message: 'Ingresa tus apellidos',
        },
        {
          whitespace: true,
          message: 'Ingresa tus apellidos',
        },
      ]}
    >
      <Input maxLength={50} />
    </Form.Item>
  );
};

export default InputLastName;
