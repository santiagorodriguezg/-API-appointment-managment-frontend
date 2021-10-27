import S from './styles';

const Chip = ({ avatar, icon, label, outlined }) => {
  return (
    <S.Chip $outlined={outlined}>
      {avatar} {icon} <S.Label ellipsis>{label}</S.Label>
    </S.Chip>
  );
};

export default Chip;
