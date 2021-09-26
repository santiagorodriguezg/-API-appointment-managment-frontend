import { Form, Input } from 'antd';

const InputFirstName = () => {
  return (
    <Form.Item
      name="first_name"
      label="Nombre"
      rules={[
        {
          required: true,
          message: 'Ingresa tu nombre',
        },
        {
          whitespace: true,
          message: 'Ingresa tu nombre',
        },
      ]}
    >
      <Input maxLength={50} />
    </Form.Item>
  );
};

export default InputFirstName;
