import { Form, Input } from 'antd';

const InputNeighborhood = () => {
  return (
    <Form.Item name="neighborhood" label="Barrio">
      <Input maxLength={40} />
    </Form.Item>
  );
};

export default InputNeighborhood;
