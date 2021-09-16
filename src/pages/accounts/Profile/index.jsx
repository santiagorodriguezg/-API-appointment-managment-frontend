import { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import { GetMyProfileService } from '../../../services/Users';
import Dashboard from '../../../components/Dashboard';
import ProfileCard, { ProfileCardItem } from '../../../components/ProfileCard';
import ErrorMessage from '../../../components/ErrorMessage';
import S from '../../../components/Dashboard/styles';
import StyledGlobal from '../../../styles/Global';

const Profile = ({ location }) => {
  const { successMsg } = (location && location.state) || {};
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await GetMyProfileService();

        setUser(res.data);
        setLoading(false);
        window.history.replaceState({}, document.title);
        if (successMsg) {
          message.success(successMsg);
        }
      } catch (err) {
        if (err.response) {
          setLoading(false);
          setErrorMsg(false);
        } else {
          setLoading(false);
          setErrorMsg(true);
        }
      }
    };
    load();
  }, []);

  return (
    <Dashboard>
      <StyledGlobal.Wrapper800>
        <S.Title level={3}>Mi cuenta</S.Title>
        {errorMsg ? (
          <ErrorMessage retryBtn />
        ) : (
          <Spin spinning={loading} size="large">
            <ProfileCard title="Datos básicos">
              <ProfileCardItem
                href="/accounts/name"
                title="Nombre"
                content={`${user.first_name || ''} ${user.last_name || ''}`}
              />
              <ProfileCardItem
                href="/accounts/identification"
                title="Identificación"
                content={user.identification_number || ''}
              />
            </ProfileCard>

            <ProfileCard title="Datos de contacto">
              <ProfileCardItem
                href="/accounts/email"
                title="Correo electrónico"
                content={user.email || 'Ingresa tu correo electrónico para recuperar tu cuenta.'}
              />
              <ProfileCardItem
                href="/accounts/phone"
                title="Teléfono"
                content={user.phone || 'Ingresa tu número de teléfono para que te podamos contactar más rápido.'}
              />
              <ProfileCardItem
                href="/accounts/location"
                title="Dirección"
                content={`${user.address || ''} ${user.neighborhood || ''} ${user.city || ''}`}
              />
            </ProfileCard>

            <ProfileCard title="Datos de cuenta">
              <ProfileCardItem title="Usuario" content={user.username} showIcon={false} />
            </ProfileCard>

            <ProfileCard title="Seguridad">
              <ProfileCardItem href="/accounts/password/change" title="Contraseña" content="********" />
            </ProfileCard>
          </Spin>
        )}
      </StyledGlobal.Wrapper800>
    </Dashboard>
  );
};
export default Profile;
