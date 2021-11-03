import { Form, Select } from 'antd';
import { userRoles } from '../../config/utils/enums';

const InputUserType = ({ ...props }) => {
  return (
    <Form.Item
      name="role"
      label="Tipo de Usuario"
      rules={[
        {
          required: true,
          message: 'Selecciona el tipo de usuario',
        },
      ]}
    >
      <Select placeholder="Selecciona el tipo de usuario" {...props}>
        {userRoles.map(obj => (
          <Select.Option key={obj.value} value={obj.value}>
            {obj.text}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default InputUserType;
