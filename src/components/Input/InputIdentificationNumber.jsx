import { Form } from 'antd';
import InputNumber from './InputNumber';

const InputIdentificationNumber = () => {
  return (
    <Form.Item
      name="identification_number"
      label="Número de identificación"
      rules={[
        {
          required: true,
          message: 'Ingresa tu número de identificación',
        },
      ]}
    >
      <InputNumber min={1} />
    </Form.Item>
  );
};

export default InputIdentificationNumber;
