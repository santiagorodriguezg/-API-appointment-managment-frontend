import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import Logo from '../Logo';
import Button from '../Button';
import StyledGlobal from '../../styles/Global';
import S from './styles';

const Card = ({ title, children }) => {
  const history = useHistory();

  return (
    <Layout.Content>
      <S.Container>
        <StyledGlobal.CardBase bordered={false}>
          <Logo />
          <S.Title>{title}</S.Title>
          {children}
          <S.Button>
            <Button type="primary" onClick={() => history.push('/accounts/login')} $marginTop>
              Iniciar sesión
            </Button>
          </S.Button>
        </StyledGlobal.CardBase>
      </S.Container>
    </Layout.Content>
  );
};

export default Card;
