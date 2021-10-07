import { Button, Result } from 'antd';
import Footer from '../../../components/Footer';
import StyledGlobal from '../../../styles/Global';

const Error403 = () => {
  return (
    <StyledGlobal.Wrapper style={{ height: '100%' }}>
      <StyledGlobal.WrapperContent>
        <Result
          status="403"
          title="403"
          subTitle="Lo sentimos, no estás autorizado a acceder a esta página."
          extra={
            <Button type="primary" href="/accounts/profile">
              Regresar a Mi cuenta
            </Button>
          }
        />
      </StyledGlobal.WrapperContent>
      <Footer />
    </StyledGlobal.Wrapper>
  );
};

export default Error403;
