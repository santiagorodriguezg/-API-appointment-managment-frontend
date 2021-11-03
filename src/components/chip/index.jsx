import S from './styles';

const Chip = ({ avatar, icon, label, outlined, href }) => {
  const renderContent = () => {
    return (
      <>
        {avatar} {icon} <S.Label ellipsis>{label}</S.Label>
      </>
    );
  };

  return (
    <S.Chip $outlined={outlined} $href={href}>
      {href ? <S.Link to={href}>{renderContent()}</S.Link> : renderContent()}
    </S.Chip>
  );
};

export default Chip;
