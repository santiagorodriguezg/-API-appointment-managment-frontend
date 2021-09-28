import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Skeleton } from 'antd';
import { UpdateMyProfileService } from '../../../services/Users';
import useUserProfile from '../../../hooks/useUserProfile';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSaveAccount } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import InputIdentificationType from '../../../components/Input/InputIdentificationType';
import InputIdentificationNumber from '../../../components/Input/InputIdentificationNumber';
import DashboardPageAccount from '../../../components/Dashboard/DashboardPageAccount';

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
          successMsg: 'Su identificación se actualizo correctamente',
        },
      }}
    />
  ) : (
    <DashboardPageAccount title="Identificación">
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
            <InputIdentificationType />

            <InputIdentificationNumber required />

            <Form.Item>
              <ButtonCancelAndSaveAccount loading={btnLoading} />
            </Form.Item>
          </Form>
        </Skeleton>
      )}
    </DashboardPageAccount>
  );
};
export default Identification;
