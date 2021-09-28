import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import S from './styles';

const PageHeader = ({ title, path }) => {
  const history = useHistory();
  return (
    <S.PageHeader
      onBack={() => history.replace(path)}
      title={title}
      backIcon={<Button type="text" shape="circle" icon={<ArrowLeftOutlined />} />}
    />
  );
};

export default PageHeader;
