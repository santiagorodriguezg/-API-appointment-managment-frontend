import { useHistory } from 'react-router-dom';
import { Button, Result } from 'antd';
import Footer from '../../../components/Footer';
import StyledGlobal from '../../../styles/Global';

const Error404 = () => {
  const history = useHistory();

  return (
    <StyledGlobal.Wrapper style={{ height: '100%' }}>
      <StyledGlobal.WrapperContent>
        <Result
          status="404"
          title="404"
          subTitle="Lo sentimos, la página que has visitado no existe."
          extra={
            <Button type="primary" onClick={() => history.push('/accounts/profile')}>
              Regresar a Mi cuenta
            </Button>
          }
        />
      </StyledGlobal.WrapperContent>
      <Footer />
    </StyledGlobal.Wrapper>
  );
};

export default Error404;
