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
        <ProfileCardItem title="Identificación" content="1007141532" />
      </ProfileCard>

      <ProfileCard title="Datos de contacto">
        <ProfileCardItem title="Correo electrónico" content="luis@gmail.com" />
        <ProfileCardItem title="Teléfono" content="3144823086" />
        <ProfileCardItem title="Dirección" content="cra 15 #12-4 Centro Tunja" />
      </ProfileCard>

      <ProfileCard title="Datos de cuenta">
        <ProfileCardItem title="Usuario" content="luisgomez" />
      </ProfileCard>

      <ProfileCard title="Seguridad">
        <ProfileCardItem title="Contraseña" content="********" />
      </ProfileCard>
    </Dashboard>
  );
};
export default Profile;
