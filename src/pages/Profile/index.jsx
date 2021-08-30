import { Typography } from 'antd';
import Dashboard from '../../components/Dashboard';
import ProfileCard, { ProfileCardItem } from '../../components/ProfileCard';

const { Title } = Typography;

const Profile = () => {
  return (
    <Dashboard>
      <Title level={3}>Perfil</Title>
      <ProfileCard title="Datos básicos">
        <ProfileCardItem href="/profile/name" title="Nombre" content="Luis Guillermo Gómez Galeano" />
        <ProfileCardItem href="/profile/identification" title="Identificación" content="1007141532" />
      </ProfileCard>

      <ProfileCard title="Datos de contacto">
        <ProfileCardItem href="/profile/email" title="Correo electrónico" content="luis@gmail.com" />
        <ProfileCardItem href="/profile/phone" title="Teléfono" content="3144823086" />
        <ProfileCardItem href="/profile/location" title="Dirección" content="cra 15 #12-4 Centro Tunja" />
      </ProfileCard>

      <ProfileCard title="Datos de cuenta">
        <ProfileCardItem href="/profile/username" title="Usuario" content="luisgomez" />
      </ProfileCard>

      <ProfileCard title="Seguridad">
        <ProfileCardItem href="/accounts/password/change" title="Contraseña" content="********" />
      </ProfileCard>
    </Dashboard>
  );
};
export default Profile;
