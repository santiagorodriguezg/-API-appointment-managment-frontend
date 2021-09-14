import StyledGlobal from '../../styles/Global';
import PageHeader from '../PageHeader';
import NavBar from '../NavBar';
import Footer from '../Footer';
import S from './styles';

const DashboardPageEdit = ({ title, children }) => {
  return (
    <>
      <NavBar />
      <StyledGlobal.Wrapper>
        <S.Content>
          <StyledGlobal.Wrapper800>
            <PageHeader onBack={() => window.history.back()} title={title} />
            <StyledGlobal.ContainerForm shadow marginTop={16}>
              {children}
            </StyledGlobal.ContainerForm>
          </StyledGlobal.Wrapper800>
        </S.Content>
        <Footer />
      </StyledGlobal.Wrapper>
    </>
  );
};
export default DashboardPageEdit;
