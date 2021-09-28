import DashboardPage from './DashboardPage';
import StyledGlobal from '../../styles/Global';

const DashboardPageAccount = ({ title, children }) => {
  return (
    <DashboardPage title={title} path="/accounts/profile">
      <StyledGlobal.ContainerForm shadow marginTop={16}>
        {children}
      </StyledGlobal.ContainerForm>
    </DashboardPage>
  );
};

export default DashboardPageAccount;
