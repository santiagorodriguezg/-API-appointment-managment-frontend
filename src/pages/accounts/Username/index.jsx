import { useContext, useEffect, useState } from 'react';
import { Divider, Form, Skeleton, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../../context/Auth';
import useUserProfile from '../../../hooks/useUserProfile';
import { UpdateMyProfileService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSave } from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import DashboardPageEdit from '../../../components/Dashboard/DashboardPageEdit';
import InputUsername from '../../../components/Input/InputUsername';

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
            <InputUsername />

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
