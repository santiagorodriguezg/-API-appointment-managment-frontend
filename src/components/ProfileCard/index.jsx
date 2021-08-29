import { Typography } from 'antd';
import S from './styles';

const { Title } = Typography;

const ProfileCard = ({ title, children }) => {
  return (
    <S.Card bordered={false} bodyStyle={{ padding: 0 }}>
      <Title level={4} style={{ padding: '20px' }}>
        {title}
      </Title>
      {children}
    </S.Card>
  );
};

export { default as ProfileCardItem } from './ProfileCardItem';
export default ProfileCard;
