import { useContext, useEffect, useState } from 'react';
import { Avatar, Col, Row, Skeleton, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import ContactInfo from '../../components/ContactInfo';
import { DoctorsListService } from '../../services/Users';
import { GetMyChatsService } from '../../services/Chat';
import { getChatLink } from '../../config/utils';
import Chip from '../../components/chip';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import DashboardStyles from '../../components/Dashboard/styles';
import CardStyles from '../../components/Card/styles';
import StyledGlobal from '../../styles/Global';

const { Title } = Typography;

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);

  const getDoctors = async () => {
    if (user?.role) {
      try {
        setLoading(true);
        setRooms([]);

        const res = await DoctorsListService();
        const resChat = await GetMyChatsService(user.username);

        setDoctors(res.data.results);
        setRooms(resChat.data.results.rooms);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setErrorMsg(true);
      }
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <DashboardPage>
      <DashboardStyles.Title level={3}>Contacto</DashboardStyles.Title>
      <StyledGlobal.CardBase bordered={false}>
        <CardStyles.Text>
          Si necesitas ayuda o tienes alguna duda puedes comunicarte con nosotros a través de:
        </CardStyles.Text>
        <ContactInfo />
      </StyledGlobal.CardBase>

      <Skeleton active loading={loading}>
        {!errorMsg && doctors.length > 0 && (
          <StyledGlobal.CardBase bordered={false} style={{ marginTop: 32 }}>
            <Title level={4}>Chat</Title>
            <CardStyles.Text>
              También puedes comunicarte con los profesionales de la Casa de la Mujer a través del chat.
            </CardStyles.Text>
            <CardStyles.Text>Haz clic en el nombre del profesional para abrir el chat.</CardStyles.Text>
            <Row gutter={64}>
              {doctors.map(doctor => (
                <Col key={doctor.username} xs={24} sm={12} style={{ marginBottom: 16 }}>
                  <Chip
                    label={doctor.full_name}
                    outlined
                    avatar={<Avatar src={doctor.picture} icon={<UserOutlined />} />}
                    href={doctor.username !== user.username ? getChatLink(doctor, rooms) : null}
                  />
                </Col>
              ))}
            </Row>
          </StyledGlobal.CardBase>
        )}
      </Skeleton>
    </DashboardPage>
  );
};

export default Contact;
