import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Skeleton } from 'antd';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../utils/Utils';
import ErrorMessage from '../../../components/ErrorMessage';

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
    <DashboardPageEdit title="Ubicación">
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su ubicación se actualizo correctamente',
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
            name="location"
            onFinish={onFinish}
            hideRequiredMark
          >
            <Form.Item
              name="city"
              label="Cuidad"
              rules={[
                {
                  required: true,
                  message: 'Ingrese el nombre de la ciudad',
                },
              ]}
            >
              <Input maxLength={30} />
            </Form.Item>

            <Form.Item name="neighborhood" label="Barrio">
              <Input maxLength={40} />
            </Form.Item>

            <Form.Item name="address" label="Dirección">
              <Input maxLength={40} />
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
export default Location;
