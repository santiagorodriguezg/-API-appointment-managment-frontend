import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Skeleton } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../utils/Utils';
import ErrorMessage from '../../../components/ErrorMessage';

const Email = () => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [{ loading, user, errorMsg, redirect, setRedirect }, setErrorMsg] = useUserProfile();

  useEffect(() => {
    setInitialValues({
      email: user.email,
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
    <DashboardPageEdit title="Correo electrónico">
      {loading && <Skeleton active />}
      {errorMsg && <ErrorMessage retryBtn />}
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su correo electrónico se actualizo correctamente',
            },
          }}
        />
      )}
      {!loading && !errorMsg && (
        <Form
          form={form}
          initialValues={initialValues}
          layout="vertical"
          name="updateEmail"
          onFinish={onFinish}
          hideRequiredMark
        >
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
            <ButtonCancelAndSave loading={btnLoading} />
          </Form.Item>
        </Form>
      )}
    </DashboardPageEdit>
  );
};
export default Email;
