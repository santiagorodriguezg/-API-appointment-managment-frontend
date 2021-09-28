import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Skeleton } from 'antd';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSaveAccount } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import InputEmail from '../../../components/Input/InputEmail';
import DashboardPageAccount from '../../../components/Dashboard/DashboardPageAccount';

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
      setBtnLoading(false);
      if (e.response) {
        setErrorMsg(false);
        form.setFields(getFieldErrors(e.response.data.errors));
      } else {
        setErrorMsg(true);
      }
    }
  };

  return redirect ? (
    <Redirect
      to={{
        pathname: '/accounts/profile',
        state: {
          successMsg: 'Su correo electrónico se actualizo correctamente',
        },
      }}
    />
  ) : (
    <DashboardPageAccount title="Correo electrónico">
      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <Skeleton active loading={loading}>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            name="email"
            onFinish={onFinish}
            hideRequiredMark
          >
            <InputEmail required />

            <Form.Item>
              <ButtonCancelAndSaveAccount loading={btnLoading} />
            </Form.Item>
          </Form>
        </Skeleton>
      )}
    </DashboardPageAccount>
  );
};
export default Email;
