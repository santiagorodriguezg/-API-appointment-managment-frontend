import { Form, Input } from 'antd';

const InputAddress = () => {
  return (
    <Form.Item name="address" label="Dirección">
      <Input maxLength={60} />
    </Form.Item>
  );
};

export default InputAddress;
