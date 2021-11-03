import { Link } from 'react-router-dom';
import { Descriptions, Tooltip } from 'antd';
import { FacebookFilled, MailFilled, PhoneFilled } from '@ant-design/icons';
import Button from '../Button';
import Description from '../Description';

const ContactInfo = () => {
  return (
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
  );
};
export default ContactInfo;
