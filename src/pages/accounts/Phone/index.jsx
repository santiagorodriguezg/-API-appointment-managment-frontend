import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, InputNumber, Skeleton } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../utils/Utils';
import ErrorMessage from '../../../components/ErrorMessage';

const Phone = () => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [{ loading, user, errorMsg, redirect, setRedirect }, setErrorMsg] = useUserProfile();

  useEffect(() => {
    setInitialValues({
      phone: user.phone,
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
    <DashboardPageEdit title="Teléfono">
      {loading && <Skeleton active />}
      {errorMsg && <ErrorMessage retryBtn />}
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su número de teléfono se actualizo correctamente',
            },
          }}
        />
      )}
      {!loading && !errorMsg && (
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          name="updatePhone"
          onFinish={onFinish}
          hideRequiredMark
        >
          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[
              {
                required: true,
                message: 'Ingrese su número de teléfono',
              },
            ]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <ButtonCancelAndSave loading={btnLoading} />
          </Form.Item>
        </Form>
      )}
    </DashboardPageEdit>
  );
};
export default Phone;
