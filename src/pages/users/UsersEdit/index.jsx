import { Redirect, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Skeleton } from 'antd';
import { UsersDetailService, UsersUpdateService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import { ButtonCancelAndSave } from '../../../components/Button';
import DashboardPage from '../../../components/Dashboard/DashboardPage';
import InputFirstName from '../../../components/Input/InputFirstName';
import InputLastName from '../../../components/Input/InputLastName';
import InputIdentificationType from '../../../components/Input/InputIdentificationType';
import InputIdentificationNumber from '../../../components/Input/InputIdentificationNumber';
import InputEmail from '../../../components/Input/InputEmail';
import InputPhone from '../../../components/Input/InputPhone';
import InputCity from '../../../components/Input/InputCity';
import InputNeighborhood from '../../../components/Input/InputNeighborhood';
import InputAddress from '../../../components/Input/InputAddress';
import ErrorMessage, { UserNotFound } from '../../../components/ErrorMessage';
import StyledGlobal from '../../../styles/Global';

const UsersEdit = () => {
  const [form] = Form.useForm();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [error404, setError404] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        setErrorMsg(false);

        const res = await UsersDetailService(username);
        setInitialValues({
          username: res.data.username,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          identification_type: res.data.identification_type,
          identification_number: res.data.identification_number,
          email: res.data.email,
          phone: res.data.phone,
          city: res.data.city,
          neighborhood: res.data.neighborhood,
          address: res.data.address,
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (e.response) {
          if (e.response.status === 404) setError404(true);
          setErrorMsg(false);
        } else {
          setErrorMsg(true);
        }
      }
    };
    getUserInfo();
  }, [username]);

  const onFinish = async values => {
    try {
      setErrorMsg(false);
      setLoading(true);
      await UsersUpdateService(username, values);
      setRedirect(true);
    } catch (e) {
      setLoading(false);
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
        pathname: `/users/${username}`,
        state: {
          successMsg: 'Información del usuario actualizada correctamente',
        },
      }}
    />
  ) : (
    <DashboardPage title="Editar usuario" path="/users">
      <StyledGlobal.WrapperInner style={{ padding: '48px 24px 24px 24px' }}>
        {errorMsg && <ErrorMessage retryBtn />}
        {!errorMsg && error404 && <UserNotFound />}
        {!errorMsg && !error404 && (
          <Skeleton active loading={loading} paragraph={{ rows: 5 }}>
            <Form
              form={form}
              name="edit_user"
              layout="vertical"
              requiredMark="optional"
              initialValues={initialValues}
              onFinish={onFinish}
            >
              <Form.Item name="username" noStyle>
                <Input type="hidden" />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputFirstName />
                </Col>

                <Col xs={24} md={12}>
                  <InputLastName />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputIdentificationType />
                </Col>

                <Col xs={24} md={12}>
                  <InputIdentificationNumber required />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputPhone required />
                </Col>

                <Col xs={24} md={12}>
                  <InputEmail />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputCity />
                </Col>

                <Col xs={24} md={12}>
                  <InputNeighborhood />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputAddress />
                </Col>
              </Row>

              <Form.Item>
                <ButtonCancelAndSave loading={loading} path="/users" />
              </Form.Item>
            </Form>
          </Skeleton>
        )}
      </StyledGlobal.WrapperInner>
    </DashboardPage>
  );
};

export default UsersEdit;
