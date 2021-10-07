import { Fragment } from 'react';
import { Col, Descriptions, Image, Modal, Row, Tag } from 'antd';
import { FilePdfOutlined, PlayCircleOutlined } from '@ant-design/icons';
import Button from '../../../components/Button';
import Description from '../../../components/Description';
import { getFullDate } from '../../../config/utils';
import { appointmentMultimedia, getAppointmentTypeColor, getAppointmentTypeName } from '../../../config/utils/enums';

const ModalContent = ({ isModalVisible, modalInfo, handleCancel }) => {
  const images = modalInfo?.multimedia.filter(f => f.file_type === appointmentMultimedia[0].value);
  const files = modalInfo?.multimedia.filter(f => f.file_type === appointmentMultimedia[1].value);

  return (
    <Modal
      footer={[
        <Button type="primary" key="close" onClick={handleCancel}>
          Cerrar
        </Button>,
      ]}
      maskClosable={false}
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <Description column={1} layout="vertical">
        <Descriptions.Item label="Fecha de solicitud">{getFullDate(modalInfo.created_at)}</Descriptions.Item>

        <Descriptions.Item label="Fecha de actualización">{getFullDate(modalInfo.updated_at)}</Descriptions.Item>

        <Descriptions.Item label="Tipo de cita">
          {modalInfo.type.map(tag => {
            return (
              <Tag key={tag} color={getAppointmentTypeColor(tag)}>
                {getAppointmentTypeName(tag)}
              </Tag>
            );
          })}
        </Descriptions.Item>

        <Descriptions.Item label="Hijos">
          {modalInfo.children ? (
            <Descriptions column={1} style={{ paddingLeft: 24 }}>
              {modalInfo.children.map((child, index) => {
                return (
                  <Fragment key={index}>
                    <Descriptions.Item label="Nombre">{child.name}</Descriptions.Item>
                    <Descriptions.Item label="Edad">{child.age}</Descriptions.Item>
                  </Fragment>
                );
              })}
            </Descriptions>
          ) : (
            <>No.</>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<>Datos del posible agresor</>} span={1}>
          {modalInfo.aggressor ? (
            <Descriptions column={1} style={{ paddingLeft: 24 }}>
              <Descriptions.Item label="Nombre">{modalInfo.aggressor.name}</Descriptions.Item>
              <Descriptions.Item label="Edad">{modalInfo.aggressor.age}</Descriptions.Item>
              <Descriptions.Item label="Documento">{modalInfo.aggressor.identification_number}</Descriptions.Item>
              <Descriptions.Item label="Teléfono"> {modalInfo.aggressor.phone}</Descriptions.Item>
              <Descriptions.Item label="Dirección" style={{ paddingBottom: 0 }}>
                {modalInfo.aggressor.address}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <>No hay información.</>
          )}
        </Descriptions.Item>

        {modalInfo.aggressor && (
          <Descriptions.Item label="Información adicional" style={{ paddingLeft: 24 }}>
            {modalInfo.aggressor.more_info}
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Datos adicionales">
          {modalInfo.description ? modalInfo.description : <>No hay información.</>}
        </Descriptions.Item>

        <Descriptions.Item label="Audio">
          <Button type="link" shape="circle" icon={<PlayCircleOutlined />} href={modalInfo.audio} target="_blank">
            Escuchar
          </Button>
        </Descriptions.Item>

        <Descriptions.Item label="Fotos">
          <Image.PreviewGroup>
            <Row gutter={8}>
              {images.map(f => {
                return (
                  <Col key={f.id} span={12}>
                    <Image src={f.file} />
                  </Col>
                );
              })}
            </Row>
          </Image.PreviewGroup>
        </Descriptions.Item>

        <Descriptions.Item label="Archivos" style={{ paddingBottom: 0 }}>
          <Row gutter={8}>
            {files.map(f => {
              return (
                <Col key={f.id} span={12}>
                  <Button type="link" shape="circle" icon={<FilePdfOutlined />} href={f.file} target="_blank">
                    {f.file_name}
                  </Button>
                </Col>
              );
            })}
          </Row>
        </Descriptions.Item>
      </Description>
    </Modal>
  );
};

export default ModalContent;
