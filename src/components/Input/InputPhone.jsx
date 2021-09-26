import { Form } from 'antd';
import InputNumber from './InputNumber';

const InputPhone = () => {
  return (
    <Form.Item
      name="phone"
      label="Teléfono"
      rules={[
        {
          required: true,
          message: 'Ingresa tu número de teléfono',
        },
      ]}
    >
      <InputNumber min={3} />
    </Form.Item>
  );
};

export default InputPhone;
