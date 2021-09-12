import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Select, Skeleton } from 'antd';
import { UpdateMyProfileService } from '../../../services/Users';
import useUserProfile from '../../../hooks/useUserProfile';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import { getFieldErrors } from '../../../config/utils';
import ErrorMessage from '../../../components/ErrorMessage';
import InputNumber from '../../../components/Input/InputNumber';
import { identificationTypes } from '../../../config/utils/enums';

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

      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <Skeleton active loading={loading}>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            name="identification"
            onFinish={onFinish}
            hideRequiredMark
          >
            <Form.Item name="identification_type" label="Tipo de identificación">
              <Select placeholder="Seleccione un tipo de identificación">
                {identificationTypes.map(obj => (
                  <Option key={obj.value} value={obj.value}>
                    {obj.text}
                  </Option>
                ))}
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
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item>
              <ButtonCancelAndSave loading={btnLoading} />
            </Form.Item>
          </Form>
        </Skeleton>
      )}
    </DashboardPageEdit>
  );
};
export default Identification;
