import { Fragment } from 'react';
import { Descriptions, Modal, Tag } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import Button from '../../../components/Button';
import { getFullDate } from '../../../config/utils';
import { getAppointmentTypeColor, getAppointmentTypeName } from '../../../config/utils/enums';

const ModalContent = ({ isModalVisible, modalInfo, handleCancel }) => {
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
      <Descriptions column={1} layout="vertical">
        <Descriptions.Item label={<strong>Fecha de solicitud</strong>}>
          {getFullDate(modalInfo.created_at)}
        </Descriptions.Item>

        <Descriptions.Item label={<strong>Fecha de actualización</strong>}>
          {getFullDate(modalInfo.updated_at)}
        </Descriptions.Item>

        <Descriptions.Item label={<strong>Tipo de cita</strong>}>
          {modalInfo.type.map(tag => {
            return (
              <Tag key={tag} color={getAppointmentTypeColor(tag)}>
                {getAppointmentTypeName(tag)}
              </Tag>
            );
          })}
        </Descriptions.Item>

        <Descriptions.Item label={<strong>Hijos</strong>}>
          {modalInfo.children ? (
            <Descriptions column={1} style={{ paddingLeft: 24 }}>
              {modalInfo.children.map((child, index) => {
                return (
                  <Fragment key={index}>
                    <Descriptions.Item label={<strong>Nombre</strong>}>{child.name}</Descriptions.Item>
                    <Descriptions.Item label={<strong>Edad</strong>}>{child.age}</Descriptions.Item>
                  </Fragment>
                );
              })}
            </Descriptions>
          ) : (
            <>No.</>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<strong>Datos del posible agresor</strong>} span={1}>
          {modalInfo.aggressor ? (
            <Descriptions column={1} style={{ paddingLeft: 24 }}>
              <Descriptions.Item label={<strong>Nombre</strong>}>{modalInfo.aggressor.name}</Descriptions.Item>
              <Descriptions.Item label={<strong>Edad</strong>}>{modalInfo.aggressor.age}</Descriptions.Item>
              <Descriptions.Item label={<strong>Documento</strong>}>
                {modalInfo.aggressor.identification_number}
              </Descriptions.Item>
              <Descriptions.Item label={<strong>Teléfono</strong>}> {modalInfo.aggressor.phone}</Descriptions.Item>
              <Descriptions.Item label={<strong>Dirección</strong>} style={{ paddingBottom: 0 }}>
                {modalInfo.aggressor.address}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <>No hay información.</>
          )}
        </Descriptions.Item>

        {modalInfo.aggressor && (
          <Descriptions.Item label={<strong>Información adicional</strong>} style={{ paddingLeft: 24 }}>
            {modalInfo.aggressor.more_info}
          </Descriptions.Item>
        )}

        <Descriptions.Item label={<strong>Datos adicionales</strong>}>
          {modalInfo.description ? modalInfo.description : <>No hay información.</>}
        </Descriptions.Item>

        <Descriptions.Item label={<strong>Audio</strong>} style={{ paddingBottom: 0 }}>
          <Button type="link" shape="circle" icon={<PlayCircleOutlined />} href={modalInfo.audio} target="_blank">
            Escuchar
          </Button>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ModalContent;
