import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Col, message, Spin, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from '../../../context/Auth';
import { UsersDetailService } from '../../../services/Users';
import Button from '../../../components/Button';
import ErrorMessage, { UserNotFound } from '../../../components/ErrorMessage';
import DashboardPage from '../../../components/Dashboard/DashboardPage';
import { getFullDate } from '../../../config/utils';
import { getIdentificationTypeName, getRoleColor, getRoleName, userRoles } from '../../../config/utils/enums';
import StyledGlobal from '../../../styles/Global';
import S from './styles';

const UsersDetail = ({ location }) => {
  const { username } = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { successMsg } = (location && location.state) || {};
  const [errorMsg, setErrorMsg] = useState(false);
  const [error404, setError404] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        setErrorMsg(false);

        const res = await UsersDetailService(username);
        setUserInfo(res.data);
        setLoading(false);

        window.history.replaceState({}, document.title);
        if (successMsg) message.success(successMsg);
      } catch (e) {
        if (e.response) {
          if (e.response.status === 404) setError404(true);
          setErrorMsg(false);
        } else {
          setErrorMsg(true);
        }
        setLoading(false);
      }
    };
    getUserInfo();
  }, [username]);

  return (
    <DashboardPage title="Información del usuario" path="/users">
      <Spin size="large" spinning={loading}>
        {errorMsg && <ErrorMessage retryBtn />}
        {!errorMsg && error404 && <UserNotFound />}
        {!errorMsg && !error404 && (
          <S.Card>
            <S.UpperContainer>
              <S.ImageContaier>
                <Avatar size={130} icon={<UserOutlined />} src={userInfo.picture} />
              </S.ImageContaier>
            </S.UpperContainer>
            <S.LowerContainer>
              <S.Title level={5}>{userInfo.full_name}</S.Title>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Rol:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  <Tag color={getRoleColor(userInfo.role)}>{getRoleName(userInfo.role)}</Tag>
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Usuario:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.username}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Tipo de identificación:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {getIdentificationTypeName(userInfo.identification_type)}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Número de identificación:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.identification_number}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Correo electrónico:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.email}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Teléfono:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.phone}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Cuidad:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.city}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Barrio:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.neighborhood}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Dirección:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {userInfo.address}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Fecha de registro:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {getFullDate(userInfo.created_at)}
                </Col>
              </S.Row>
              <S.Row>
                <S.Col xs={24} sm={8} md={10}>
                  Fecha de actualización:
                </S.Col>
                <Col xs={24} sm={16} md={14}>
                  {getFullDate(userInfo.updated_at)}
                </Col>
              </S.Row>
              {user.role === userRoles[0].value && (
                <>
                  <S.Row>
                    <S.Col xs={24} sm={8} md={10}>
                      Activo:
                      <StyledGlobal.TextSecondary>
                        Indica si la cuenta del usuario está activa.
                      </StyledGlobal.TextSecondary>
                    </S.Col>
                    <Col xs={24} sm={16} md={14}>
                      {userInfo.is_active ? (
                        <>
                          Si <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        </>
                      ) : (
                        <>
                          No <CloseCircleOutlined style={{ color: '#f5222d' }} />
                        </>
                      )}
                    </Col>
                  </S.Row>

                  <Button
                    type="primary"
                    onClick={() => history.push(`/users/${userInfo.username}/edit`)}
                    icon={<EditOutlined />}
                    ghost
                    $marginTop
                  >
                    Editar
                  </Button>
                </>
              )}
            </S.LowerContainer>
          </S.Card>
        )}
      </Spin>
    </DashboardPage>
  );
};

export default UsersDetail;
