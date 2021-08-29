import { Form, Input } from 'antd';
import { DashboardPageEdit } from '../../components/Dashboard';
import { ButtonCancelAndSave } from '../../components/Button';

const ProfileName = () => {
  const initialValues = {
    first_name: 'Luis Guillermo',
    last_name: 'Gómez Galeano',
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit>
      <Form layout="vertical" name="updateName" initialValues={initialValues} onFinish={onFinish} hideRequiredMark>
        <Form.Item
          name="first_name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'Ingrese su nombre',
            },
            {
              whitespace: true,
              message: 'Ingrese su nombre',
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Apellidos"
          rules={[
            {
              required: true,
              message: 'Ingrese sus apellidos',
            },
            {
              whitespace: true,
              message: 'Ingrese sus apellidos',
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <Form.Item>
          <ButtonCancelAndSave href="/profile" />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default ProfileName;
