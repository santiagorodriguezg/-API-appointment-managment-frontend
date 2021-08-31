import { Form, InputNumber, Select } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';

const { Option } = Select;

const Identification = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <DashboardPageEdit title="Identificación">
      <Form layout="vertical" name="updateIdentification" onFinish={onFinish} hideRequiredMark>
        <Form.Item name="identification_type" label="Tipo de identificación">
          <Select placeholder="Seleccione un tipo de identificación">
            <Option value="CC">Cédula de ciudadanía</Option>
            <Option value="CE">Cédula de extranjería</Option>
            <Option value="NIT">Nit</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="identification_number"
          label="Número de identificación"
          rules={[
            {
              required: true,
              message: 'Ingrese su número de identificación',
            },
          ]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <AccountsButtonCancelAndSave />
        </Form.Item>
      </Form>
    </DashboardPageEdit>
  );
};
export default Identification;
