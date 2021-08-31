import { Form, Input } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';

const Phone = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit title="Teléfono">
      <Form layout="vertical" name="updatePhone" onFinish={onFinish} hideRequiredMark>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
            {
              required: true,
              message: 'Ingrese su número de celular',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <AccountsButtonCancelAndSave />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default Phone;
