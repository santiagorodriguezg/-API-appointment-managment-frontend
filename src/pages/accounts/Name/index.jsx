import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Skeleton } from 'antd';
import AuthContext from '../../../context/Auth';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { ButtonCancelAndSaveAccount } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import InputFirstName from '../../../components/Input/InputFirstName';
import InputLastName from '../../../components/Input/InputLastName';
import { getFieldErrors } from '../../../config/utils';
import DashboardPageAccount from '../../../components/Dashboard/DashboardPageAccount';

const Name = () => {
  const [form] = Form.useForm();
  const { user: userContext, setUser } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [{ loading, user, errorMsg, redirect, setRedirect }, setErrorMsg] = useUserProfile();

  useEffect(() => {
    setInitialValues({
      first_name: user.first_name,
      last_name: user.last_name,
    });
  }, [user]);

  const onFinish = async values => {
    try {
      setBtnLoading(true);
      await UpdateMyProfileService(values);

      userContext.fullName = `${values.first_name} ${values.last_name}`;
      setUser(userContext);

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
          successMsg: 'Su nombre se actualizo correctamente',
        },
      }}
    />
  ) : (
    <DashboardPageAccount title="Nombre">
      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <Skeleton active loading={loading}>
          <Form
            form={form}
            layout="vertical"
            name="name"
            initialValues={initialValues}
            onFinish={onFinish}
            hideRequiredMark
          >
            <InputFirstName />

            <InputLastName />

            <Form.Item>
              <ButtonCancelAndSaveAccount loading={btnLoading} />
            </Form.Item>
          </Form>
        </Skeleton>
      )}
    </DashboardPageAccount>
  );
};

export default Name;
