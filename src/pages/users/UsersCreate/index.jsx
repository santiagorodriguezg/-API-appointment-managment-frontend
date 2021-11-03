import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Col, Form, Row } from 'antd';
import { UsersCreateService } from '../../../services/Users';
import { getFieldErrors } from '../../../config/utils';
import DashboardPage from '../../../components/Dashboard/DashboardPage';
import InputFirstName from '../../../components/Input/InputFirstName';
import InputLastName from '../../../components/Input/InputLastName';
import InputIdentificationType from '../../../components/Input/InputIdentificationType';
import InputIdentificationNumber from '../../../components/Input/InputIdentificationNumber';
import InputPhone from '../../../components/Input/InputPhone';
import InputEmail from '../../../components/Input/InputEmail';
import InputCity from '../../../components/Input/InputCity';
import InputNeighborhood from '../../../components/Input/InputNeighborhood';
import InputAddress from '../../../components/Input/InputAddress';
import { ButtonCancelAndSave } from '../../../components/Button';
import InputPassword from '../../../components/Input/InputPassword';
import InputUsername from '../../../components/Input/InputUsername';
import InputUserType from '../../../components/Input/InputUserType';
import ErrorMessage from '../../../components/ErrorMessage';
import { userRoles } from '../../../config/utils/enums';
import StyledGlobal from '../../../styles/Global';

const UsersCreate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [username, setUsername] = useState('');

  const onFinish = async values => {
    try {
      setErrorMsg(false);
      setLoading(true);
      setUsername('');

      await UsersCreateService(values);

      setUsername(values.username);
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

  const handleChange = value => {
    if (value !== userRoles[2].value) {
      setRequiredEmail(true);
    } else {
      setRequiredEmail(false);
    }
  };

  return redirect ? (
    <Redirect
      to={{
        pathname: `/users/${username}`,
        state: {
          successMsg: 'El usuario ha sido creado correctamente',
        },
      }}
    />
  ) : (
    <DashboardPage title="Crear usuario" path="/users">
      <StyledGlobal.WrapperInner style={{ padding: '48px 24px 24px 24px' }}>
        {errorMsg ? (
          <ErrorMessage retryBtn />
        ) : (
          <>
            <Alert
              message={
                <>
                  Si se asigna un correo electrónico al usuario se le envía el <strong>usuario</strong> y{' '}
                  <strong>contraseña</strong> para que acceda a la plataforma.
                </>
              }
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />
            <Form form={form} name="create_user" layout="vertical" requiredMark="optional" onFinish={onFinish}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputUserType onChange={handleChange} />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputFirstName adminMsg />
                </Col>

                <Col xs={24} md={12}>
                  <InputLastName adminMsg />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputIdentificationType />
                </Col>

                <Col xs={24} md={12}>
                  <InputIdentificationNumber required adminMsg />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputUsername adminMsg />
                </Col>

                <Col xs={24} md={12}>
                  <InputPhone required adminMsg />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputEmail required={requiredEmail} adminMsg />
                </Col>

                <Col xs={24} md={12}>
                  <InputCity />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputNeighborhood />
                </Col>

                <Col xs={24} md={12}>
                  <InputAddress />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <InputPassword adminMsg />
                </Col>

                <Col xs={24} md={12}>
                  <InputPassword confirmPassword adminMsg />
                </Col>
              </Row>

              <Form.Item>
                <ButtonCancelAndSave loading={loading} path="/users" />
              </Form.Item>
            </Form>
          </>
        )}
      </StyledGlobal.WrapperInner>
    </DashboardPage>
  );
};

export default UsersCreate;
