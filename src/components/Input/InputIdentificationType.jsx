import { Form, Select } from 'antd';
import { identificationTypes } from '../../config/utils/enums';

const InputIdentificationType = () => {
  return (
    <Form.Item
      name="identification_type"
      label="Tipo de identificación"
      rules={[
        {
          required: true,
          message: 'Seleccione el tipo de identificación',
        },
      ]}
    >
      <Select placeholder="Seleccione un tipo de identificación">
        {identificationTypes.map(obj => (
          <Select.Option key={obj.value} value={obj.value}>
            {obj.text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default InputIdentificationType;
