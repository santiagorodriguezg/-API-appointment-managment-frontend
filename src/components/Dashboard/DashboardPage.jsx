import StyledGlobal from '../../styles/Global';
import PageHeader from '../PageHeader';
import NavBar from '../NavBar';
import Footer from '../Footer';

const DashboardPage = ({ title, path, children }) => {
  return (
    <>
      <NavBar />
      <StyledGlobal.Wrapper>
        <StyledGlobal.WrapperContent>
          <StyledGlobal.Wrapper800>
            <PageHeader title={title} path={path} />
            {children}
          </StyledGlobal.Wrapper800>
        </StyledGlobal.WrapperContent>
        <Footer />
      </StyledGlobal.Wrapper>
    </>
  );
};
export default DashboardPage;
