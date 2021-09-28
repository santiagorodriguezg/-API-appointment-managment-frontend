import { Form, Input } from 'antd';

const InputCity = () => {
  return (
    <>
      <Form.Item
        name="city"
        label="Cuidad / Municipio"
        rules={[
          {
            required: true,
            message: 'Ingresa el nombre de la ciudad o municipio',
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>
    </>
  );
};

export default InputCity;
