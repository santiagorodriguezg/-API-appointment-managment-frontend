import { useContext, useEffect, useState } from 'react';
import { Divider, Form, Input, Skeleton, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import { DashboardPageEdit } from '../../../components/Dashboard';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../utils/Utils';
import ErrorMessage from '../../../components/ErrorMessage';
import { ButtonCancelAndSave } from '../../../components/Button';
import AuthContext from '../../../context/Auth';

const { Title, Paragraph } = Typography;

const Username = () => {
  const [form] = Form.useForm();
  const { setUsername } = useContext(AuthContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [{ loading, user, errorMsg, redirect, setRedirect }, setErrorMsg] = useUserProfile();

  useEffect(() => {
    setInitialValues({
      username: user.username,
    });
  }, [user]);

  const onFinish = async values => {
    try {
      setBtnLoading(true);

      await UpdateMyProfileService(values);
      setUsername(values.username);
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
    <DashboardPageEdit title="Usuario">
      {redirect && (
        <Redirect
          to={{
            pathname: '/accounts/profile',
            state: {
              successMsg: 'Su usuario se actualizo correctamente',
            },
          }}
        />
      )}

      {errorMsg ? (
        <ErrorMessage retryBtn />
      ) : (
        <Skeleton active loading={loading}>
          <Title level={5}>Para tener en cuenta</Title>
          <Paragraph>
            El usuario <strong>No</strong> debe tener palabras inapropiadas o vulgares.
          </Paragraph>
          <Divider />
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            name="username"
            onFinish={onFinish}
            hideRequiredMark
          >
            <Form.Item
              name="username"
              label="Usuario"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su usuario',
                },
                {
                  whitespace: true,
                  message: 'Ingrese su usuario',
                },
              ]}
            >
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
export default Username;
