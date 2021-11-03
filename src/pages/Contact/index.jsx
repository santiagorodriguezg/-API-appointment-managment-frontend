import ContactInfo from '../../components/ContactInfo';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import DashboardStyles from '../../components/Dashboard/styles';
import CardStyles from '../../components/Card/styles';
import StyledGlobal from '../../styles/Global';

const Contact = () => {
  return (
    <DashboardPage>
      <DashboardStyles.Title level={3}>Contacto</DashboardStyles.Title>
      <StyledGlobal.CardBase bordered={false}>
        <CardStyles.Text>
          Si necesitas ayuda o tienes alguna duda puedes comunicarte con nosotros a través de:
        </CardStyles.Text>
        <ContactInfo />
      </StyledGlobal.CardBase>
    </DashboardPage>
  );
};

export default Contact;
