import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Skeleton } from 'antd';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSaveAccount } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import DashboardPageAccount from '../../../components/Dashboard/DashboardPageAccount';
import InputCity from '../../../components/Input/InputCity';
import InputNeighborhood from '../../../components/Input/InputNeighborhood';
import InputAddress from '../../../components/Input/InputAddress';

const Location = () => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [{ loading, user, errorMsg, redirect, setRedirect }, setErrorMsg] = useUserProfile();

  useEffect(() => {
    setInitialValues({
      city: user.city,
      neighborhood: user.neighborhood,
      address: user.address,
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
          successMsg: 'Su ubicación se actualizo correctamente',
        },
      }}
    />
  ) : (
    <DashboardPageAccount title="Ubicación">
      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <Skeleton active loading={loading}>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            name="location"
            onFinish={onFinish}
            hideRequiredMark
          >
            <InputCity />
            <InputNeighborhood />
            <InputAddress />

            <Form.Item>
              <ButtonCancelAndSaveAccount loading={btnLoading} />
            </Form.Item>
          </Form>
        </Skeleton>
      )}
    </DashboardPageAccount>
  );
};
export default Location;
