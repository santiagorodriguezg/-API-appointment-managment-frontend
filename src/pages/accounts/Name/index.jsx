import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Skeleton } from 'antd';
import AuthContext from '../../../context/Auth';
import { UpdateMyProfileService } from '../../../services/Users';
import { DashboardPageEdit } from '../../../components/Dashboard';
import { ButtonCancelAndSave } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import { getFieldErrors } from '../../../config/utils';
import useUserProfile from '../../../hooks/useUserProfile';

const Name = () => {
  const [form] = Form.useForm();
  const { setName } = useContext(AuthContext);
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
      setName(`${values.first_name} ${values.last_name}`);

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
    <DashboardPageEdit title="Nombre">
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su nombre se actualizo correctamente',
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
            layout="vertical"
            name="name"
            initialValues={initialValues}
            onFinish={onFinish}
            hideRequiredMark
          >
            <Form.Item
              name="first_name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su nombre',
                },
                {
                  whitespace: true,
                  message: 'Ingrese su nombre',
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Apellidos"
              rules={[
                {
                  required: true,
                  message: 'Ingrese sus apellidos',
                },
                {
                  whitespace: true,
                  message: 'Ingrese sus apellidos',
                },
              ]}
            >
              <Input maxLength={50} />
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
export default Name;
