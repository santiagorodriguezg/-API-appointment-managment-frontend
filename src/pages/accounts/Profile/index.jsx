import { Typography } from 'antd';
import Dashboard from '../../../components/Dashboard';
import ProfileCard, { ProfileCardItem } from '../../../components/ProfileCard';

const { Title } = Typography;

const Profile = () => {
  return (
    <Dashboard>
      <Title level={3}>Mi cuenta</Title>
      <ProfileCard title="Datos básicos">
        <ProfileCardItem href="/accounts/name" title="Nombre" content="Luis Guillermo Gómez Galeano" />
        <ProfileCardItem href="/accounts/identification" title="Identificación" content="1007141532" />
      </ProfileCard>

      <ProfileCard title="Datos de contacto">
        <ProfileCardItem href="/accounts/email" title="Correo electrónico" content="luis@gmail.com" />
        <ProfileCardItem href="/accounts/phone" title="Teléfono" content="3144823086" />
        <ProfileCardItem href="/accounts/location" title="Dirección" content="cra 15 #12-4 Centro Tunja" />
      </ProfileCard>

      <ProfileCard title="Datos de cuenta">
        <ProfileCardItem href="/accounts/username" title="Usuario" content="luisgomez" />
      </ProfileCard>

      <ProfileCard title="Seguridad">
        <ProfileCardItem href="/accounts/password/change" title="Contraseña" content="********" />
      </ProfileCard>
    </Dashboard>
  );
};
export default Profile;
