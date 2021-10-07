import { Card as CardAntd, Layout } from 'antd';
import Logo from '../Logo';
import Button from '../Button';
import S from './styles';

const Card = ({ title, children }) => {
  return (
    <Layout.Content>
      <S.Container>
        <CardAntd>
          <Logo />
          <S.Title>{title}</S.Title>
          {children}
          <S.Button>
            <Button type="primary" href="/accounts/login" $marginTop>
              Iniciar sesión
            </Button>
          </S.Button>
        </CardAntd>
      </S.Container>
    </Layout.Content>
  );
};

export default Card;
