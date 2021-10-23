import { EllipsisOutlined } from '@ant-design/icons';
import S from './styles';

const TitleBar = ({ chatUser }) => {
  return (
    <>
      <div className="user-profile">
        <S.Paragraph ellipsis strong>
          {chatUser.title}
        </S.Paragraph>
      </div>
      <EllipsisOutlined />
    </>
  );
};
export default TitleBar;
