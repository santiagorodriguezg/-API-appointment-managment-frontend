import PageHeader from '../PageHeader';
import NavBar from '../NavBar';
import Footer from '../Footer';
import StyledGlobal from '../../styles/Global';

const DashboardPageEdit = ({ title, children }) => {
  return (
    <>
      <NavBar />
      <StyledGlobal.Wrapper>
        <StyledGlobal.WrapperContent>
          <StyledGlobal.WrapperContent840>
            <PageHeader onBack={() => window.history.back()} title={title} />
            <StyledGlobal.ContainerForm shadow marginTop={16}>
              {children}
            </StyledGlobal.ContainerForm>
          </StyledGlobal.WrapperContent840>
        </StyledGlobal.WrapperContent>
        <Footer />
      </StyledGlobal.Wrapper>
    </>
  );
};
export default DashboardPageEdit;
