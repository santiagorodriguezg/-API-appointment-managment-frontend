import { Form, Input } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';

const Location = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit title="Ubicación">
      <Form layout="vertical" name="updateLocation" onFinish={onFinish} hideRequiredMark>
        <Form.Item
          name="city"
          label="Cuidad"
          rules={[
            {
              required: true,
              message: 'Ingrese el nombre de la ciudad',
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

        <Form.Item>
          <AccountsButtonCancelAndSave />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default Location;
