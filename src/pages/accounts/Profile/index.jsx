import { useEffect, useState } from 'react';
import { message, Skeleton, Typography } from 'antd';
import { GetMyProfileService } from '../../../services/Users';
import Dashboard from '../../../components/Dashboard';
import ProfileCard, { ProfileCardItem } from '../../../components/ProfileCard';
import ErrorMessage from '../../../components/ErrorMessage';

const { Title } = Typography;

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
      <Title level={3}>Mi cuenta</Title>
      {loading && <Skeleton active />}
      {errorMsg && <ErrorMessage retryBtn />}
      {!loading && !errorMsg && (
        <>
          <ProfileCard title="Datos básicos">
            <ProfileCardItem href="/accounts/name" title="Nombre" content={`${user.first_name} ${user.last_name}`} />
            <ProfileCardItem
              href="/accounts/identification"
              title="Identificación"
              content={user.identification_number || ''}
            />
          </ProfileCard>

          <ProfileCard title="Datos de contacto">
            <ProfileCardItem href="/accounts/email" title="Correo electrónico" content={user.email || ''} />
            <ProfileCardItem href="/accounts/phone" title="Teléfono" content={user.phone || ''} />

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
        </>
      )}
    </Dashboard>
  );
};
export default Profile;
