import { Form, Input } from 'antd';

const InputFirstName = () => {
  return (
    <Form.Item
      name="first_name"
      label="Nombre"
      rules={[
        {
          required: true,
          message: 'Ingrese su nombre',
        },
        {
          whitespace: true,
          message: 'Ingrese su nombre',
        },
      ]}
    >
      <Input maxLength={50} />
    </Form.Item>
  );
};

export default InputFirstName;
