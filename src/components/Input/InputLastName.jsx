import { Form, Input } from 'antd';

const InputLastName = () => {
  return (
    <Form.Item
      name="last_name"
      label="Apellidos"
      rules={[
        {
          required: true,
          message: 'Ingrese sus apellidos',
        },
        {
          whitespace: true,
          message: 'Ingrese sus apellidos',
        },
      ]}
    >
      <Input maxLength={50} />
    </Form.Item>
  );
};

export default InputLastName;
