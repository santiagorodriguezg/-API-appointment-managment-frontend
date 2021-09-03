import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, InputNumber, Select, Skeleton } from 'antd';
import { UpdateMyProfileService } from '../../../services/Users';
import useUserProfile from '../../../hooks/useUserProfile';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { AccountsButtonCancelAndSave } from '../../../components/Button';
import { getFieldErrors } from '../../../utils/Utils';
import ErrorMessage from '../../../components/ErrorMessage';

const { Option } = Select;

const Identification = () => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [{ loading, user, errorMsg, redirect, setRedirect }, setErrorMsg] = useUserProfile();

  useEffect(() => {
    setInitialValues({
      identification_type: user.identification_type,
      identification_number: user.identification_number,
    });
  }, [user]);

  const onFinish = async values => {
    try {
      setBtnLoading(true);

      await UpdateMyProfileService(values);

      setRedirect(true);
    } catch (e) {
      if (e.response) {
        setBtnLoading(false);
        setErrorMsg(false);
        form.setFields(getFieldErrors(e.response.data.errors));
      } else {
        setBtnLoading(false);
        setErrorMsg(true);
      }
    }
  };

  return (
    <DashboardPageEdit title="Identificación">
      {loading && <Skeleton active />}
      {errorMsg && <ErrorMessage />}
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su identificación se actualizo correctamente',
            },
          }}
        />
      )}
      {!loading && !errorMsg && (
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          name="updateIdentification"
          onFinish={onFinish}
          hideRequiredMark
        >
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
            <AccountsButtonCancelAndSave loading={btnLoading} />
          </Form.Item>
        </Form>
      )}
    </DashboardPageEdit>
  );
};
export default Identification;
