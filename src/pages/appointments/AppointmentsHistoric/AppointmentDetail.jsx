import { Fragment } from 'react';
import { Avatar, Col, Descriptions, Image, Row, Tag } from 'antd';
import { FilePdfOutlined, PlayCircleOutlined, UserOutlined } from '@ant-design/icons';
import { getFullDate } from '../../../config/utils';
import Chip from '../../../components/chip';
import Button from '../../../components/Button';
import Description from '../../../components/Description';
import { appointmentMultimedia, getAppointmentTypeColor, getAppointmentTypeName } from '../../../config/utils/enums';

const AppointmentDetail = ({ appointment }) => {
  const images = appointment?.multimedia.filter(f => f.file_type === appointmentMultimedia[0].value);
  const files = appointment?.multimedia.filter(f => f.file_type === appointmentMultimedia[1].value);

  return (
    <Description column={1} layout="vertical">
      <Descriptions.Item label="Fecha de solicitud">{getFullDate(appointment.created_at)}</Descriptions.Item>

      <Descriptions.Item label="Fecha de actualización">{getFullDate(appointment.updated_at)}</Descriptions.Item>
      <Descriptions.Item label="Doctores">
        <Row gutter={8} style={{ width: '100%' }}>
          {appointment.doctors.length ? (
            appointment.doctors.map(doctor => (
              <Col key={doctor.username} xs={24} sm={12} style={{ marginBottom: 8 }}>
                <Chip
                  avatar={<Avatar src={doctor.picture} icon={<UserOutlined />} />}
                  label={doctor.full_name}
                  outlined
                />
              </Col>
            ))
          ) : (
            <Col span={24}>No se han asignado doctores.</Col>
          )}
        </Row>
      </Descriptions.Item>

      <Descriptions.Item label="Tipo de cita">
        {appointment.type.map(tag => (
          <Tag key={tag} color={getAppointmentTypeColor(tag)}>
            {getAppointmentTypeName(tag)}
          </Tag>
        ))}
      </Descriptions.Item>

      <Descriptions.Item label="Hijos">
        {appointment.children ? (
          <Descriptions column={1} style={{ paddingLeft: 24 }}>
            {appointment.children.map((child, index) => (
              <Fragment key={index}>
                <Descriptions.Item label="Nombre">{child.name}</Descriptions.Item>
                <Descriptions.Item label="Edad">{child.age}</Descriptions.Item>
              </Fragment>
            ))}
          </Descriptions>
        ) : (
          <>No.</>
        )}
      </Descriptions.Item>

      <Descriptions.Item label={<>Datos del posible agresor</>} span={1}>
        {appointment.aggressor ? (
          <Descriptions column={1} style={{ paddingLeft: 24 }}>
            <Descriptions.Item label="Nombre">{appointment.aggressor.name}</Descriptions.Item>
            <Descriptions.Item label="Documento">{appointment.aggressor.identification_number}</Descriptions.Item>
            <Descriptions.Item label="Teléfono"> {appointment.aggressor.phone}</Descriptions.Item>
            <Descriptions.Item label="Dirección" style={{ paddingBottom: 0 }}>
              {appointment.aggressor.address}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>No hay información.</>
        )}
      </Descriptions.Item>

      {appointment.aggressor && (
        <Descriptions.Item label="Información adicional" style={{ paddingLeft: 24 }}>
          {appointment.aggressor.more_info}
        </Descriptions.Item>
      )}

      <Descriptions.Item label="Datos adicionales">
        {appointment.description ? appointment.description : <>No hay información.</>}
      </Descriptions.Item>

      <Descriptions.Item label="Audio">
        <Button type="link" shape="circle" icon={<PlayCircleOutlined />} href={appointment.audio} target="_blank">
          Escuchar
        </Button>
      </Descriptions.Item>

      <Descriptions.Item label="Fotos">
        <Image.PreviewGroup>
          <Row gutter={8}>
            {images.map(f => (
              <Col key={f.id} span={12}>
                <Image src={f.file} />
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      </Descriptions.Item>

      <Descriptions.Item label="Archivos" style={{ paddingBottom: 0 }}>
        <Row gutter={8}>
          {files.map(f => (
            <Col key={f.id} span={12}>
              <Button type="link" shape="circle" icon={<FilePdfOutlined />} href={f.file} target="_blank">
                {f.file_name}
              </Button>
            </Col>
          ))}
        </Row>
      </Descriptions.Item>
    </Description>
  );
};

export default AppointmentDetail;
