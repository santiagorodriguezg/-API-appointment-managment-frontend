import { Divider, Form, Input, Typography } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';

const { Title, Paragraph } = Typography;

const Username = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit title="Usuario">
      <Title level={5}>Para tener en cuenta</Title>
      <Paragraph>
        El usuario <strong>No</strong> debe tener palabras inapropiadas o vulgares.
      </Paragraph>
      <Divider />
      <Form layout="vertical" name="updateUsername" onFinish={onFinish} hideRequiredMark>
        <Form.Item
          name="username"
          label="Usuario"
          rules={[
            {
              required: true,
              message: 'Ingrese su usuario',
            },
            {
              whitespace: true,
              message: 'Ingrese su usuario',
            },
          ]}
        >
          <Input maxLength={40} />
        </Form.Item>

        <Form.Item>
          <AccountsButtonCancelAndSave />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default Username;
