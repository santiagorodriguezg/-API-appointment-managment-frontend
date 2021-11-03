import { Card } from 'antd';
import ContactInfo from '../../components/ContactInfo';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import DashboardStyles from '../../components/Dashboard/styles';
import CardStyles from '../../components/Card/styles';

const Contact = () => {
  return (
    <DashboardPage>
      <DashboardStyles.Title level={3}>Contacto</DashboardStyles.Title>
      <Card>
        <CardStyles.Text>
          Si necesitas ayuda o tienes alguna duda puedes comunicarte con nosotros a través de:
        </CardStyles.Text>
        <ContactInfo />
      </Card>
    </DashboardPage>
  );
};

export default Contact;
