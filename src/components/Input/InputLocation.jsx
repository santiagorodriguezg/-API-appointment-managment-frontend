import { Form, Input } from 'antd';

const InputLocation = () => {
  return (
    <>
      <Form.Item
        name="city"
        label="Cuidad"
        rules={[
          {
            required: true,
            message: 'Ingresa el nombre de la ciudad o municipio',
          },
        ]}
      >
        <Input maxLength={30} />
      </Form.Item>

      <Form.Item name="neighborhood" label="Barrio">
        <Input maxLength={40} />
      </Form.Item>

      <Form.Item name="address" label="Dirección">
        <Input maxLength={40} />
      </Form.Item>
    </>
  );
};

export default InputLocation;
