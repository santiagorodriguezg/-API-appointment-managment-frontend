import { Form, Input } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';

const Email = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit title="Correo electrónico">
      <Form layout="vertical" name="updateEmail" onFinish={onFinish} hideRequiredMark>
        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[
            {
              required: true,
              message: 'El correo electrónico es obligatorio',
            },
            {
              type: 'email',
              message: 'El correo electrónico ingresado no es válido',
            },
          ]}
        >
          <Input maxLength={60} />
        </Form.Item>

        <Form.Item>
          <AccountsButtonCancelAndSave />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default Email;
