import { Link } from 'react-router-dom';
import { Descriptions, Tooltip } from 'antd';
import { FacebookFilled, MailFilled, PhoneFilled } from '@ant-design/icons';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Description from '../../../components/Description';
import S from '../../../components/Card/styles';

const PasswordResetDone = ({ location }) => {
  const { data } = (location && location.state) || {};
  return (
    <>
      {!data.send_email || !data.email ? (
        <Card title="Información de contacto">
          <S.Text>Para restablecer tu cuenta comunícate con nosotros a través de:</S.Text>
          <Description column={1} colon={false}>
            <Descriptions.Item
              label={
                <Tooltip title="Teléfono">
                  <Button ghost size="large" type="primary" shape="circle" icon={<PhoneFilled />} />
                </Tooltip>
              }
            >
              8 7426277
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Tooltip title="Correo electrónico">
                  <Button ghost size="large" type="primary" shape="circle" icon={<MailFilled />} />
                </Tooltip>
              }
            >
              <Link to={{ pathname: 'mailto:casadelamujeruptc@gmail.com' }} target="_blank">
                casadelamujeruptc@gmail.com
              </Link>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <Tooltip title="Facebook">
                  <Button ghost size="large" type="primary" shape="circle" icon={<FacebookFilled />} />
                </Tooltip>
              }
            >
              <Link to={{ pathname: 'https://www.facebook.com/casadelamujeruptc' }} target="_blank">
                www.facebook.com/casadelamujeruptc
              </Link>
            </Descriptions.Item>
          </Description>
        </Card>
      ) : (
        <Card title="Restablecimiento de contraseña enviado">
          <S.Text>
            Le hemos enviado un correo electrónico a <strong>{data.email}</strong> con las instrucciones para
            restablecer la contraseña.
          </S.Text>
          <S.Text>
            Si el correo electrónico no aparece en la bandeja de entrada, revisa las secciones de spam, importantes,
            entre otras.
          </S.Text>
        </Card>
      )}
    </>
  );
};

export default PasswordResetDone;
