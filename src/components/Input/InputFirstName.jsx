import { Form, Input } from 'antd';

const InputFirstName = ({ adminMsg }) => {
  const message = adminMsg ? 'Ingresa el nombre' : 'Ingresa tu nombre';

  return (
    <Form.Item
      name="first_name"
      label="Nombre"
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

export default InputFirstName;
