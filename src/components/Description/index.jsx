import S from './styles';

const Description = ({ children, ...props }) => {
  return <S.Descriptions {...props}>{children}</S.Descriptions>;
};

export default Description;
