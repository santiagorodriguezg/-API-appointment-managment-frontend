import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import S from './styles';

const PageHeader = ({ title }) => {
  return (
    <S.PageHeader
      onBack={() => window.history.back()}
      title={title}
      backIcon={<Button type="text" shape="circle" icon={<ArrowLeftOutlined />} />}
    />
  );
};

export default PageHeader;
