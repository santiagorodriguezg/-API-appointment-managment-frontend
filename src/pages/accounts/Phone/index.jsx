import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Skeleton } from 'antd';
import useUserProfile from '../../../hooks/useUserProfile';
import ErrorMessage from '../../../components/ErrorMessage';
import InputNumber from '../../../components/Input/InputNumber';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../utils/Utils';

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

      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <Skeleton active loading={loading}>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            name="phone"
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
              <InputNumber min={3} />
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
export default Phone;
