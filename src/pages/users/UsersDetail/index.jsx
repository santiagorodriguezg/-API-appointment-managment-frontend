import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Col, Result, Spin, Tag } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import AuthContext from '../../../context/Auth';
import { UsersDetailService } from '../../../services/Users';
import NavBar from '../../../components/NavBar';
import PageHeader from '../../../components/PageHeader';
import Footer from '../../../components/Footer';
import Button from '../../../components/Button';
import StyledGlobal from '../../../styles/Global';
import ErrorMessage from '../../../components/ErrorMessage';
import { getFullDate } from '../../../config/utils';
import { getIdentificationTypeName, getRoleColor, getRoleName, userRoles } from '../../../config/utils/enums';
import S from './styles';

const UsersDetail = () => {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
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
    <>
      <NavBar />
      <StyledGlobal.Wrapper>
        <StyledGlobal.WrapperContent>
          <StyledGlobal.Wrapper800>
            <PageHeader onBack={() => window.history.back()} title="Información del usuario" />
            <Spin size="large" spinning={loading}>
              {errorMsg && <ErrorMessage retryBtn />}
              {!errorMsg && error404 && (
                <Result
                  status="404"
                  title="Usuario no encontrado"
                  extra={
                    <Button type="primary" href="/users">
                      Regresar a Usuarios
                    </Button>
                  }
                />
              )}
              {!errorMsg && !error404 && (
                <S.Card>
                  <S.UpperContainer>
                    <S.ImageContaier>
                      {userInfo?.picture ? (
                        <img src={userInfo.picture} alt={userInfo.fullName} />
                      ) : (
                        <Avatar size={130} icon={<UserOutlined />} />
                      )}
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
                        {userInfo.direction}
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
                      <Button type="primary" href="#" icon={<EditOutlined />} ghost $marginTop>
                        Editar
                      </Button>
                    )}
                  </S.LowerContainer>
                </S.Card>
              )}
            </Spin>
          </StyledGlobal.Wrapper800>
        </StyledGlobal.WrapperContent>
        <Footer />
      </StyledGlobal.Wrapper>
    </>
  );
};

export default UsersDetail;
