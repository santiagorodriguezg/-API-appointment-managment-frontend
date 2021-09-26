import { useEffect, useState } from 'react';
import { Descriptions, Modal, Spin } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { PasswordResetService } from '../../../services/Users';
import Button from '../../../components/Button';
import ErrorMessage from '../../../components/ErrorMessage';
import S from './styles';

const ModalContent = ({ isModalVisible, modalInfo, handleCancel }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [link, setLink] = useState('');

  useEffect(() => {
    const getLink = async () => {
      try {
        setLoading(true);
        setErrorMsg(false);

        const res = await PasswordResetService(modalInfo.username);

        setLink(res.data.password_reset_url);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setErrorMsg(true);
      }
    };
    getLink();
  }, [modalInfo]);

  return (
    <Modal
      title={<strong>Enlace de restablecimiento de contraseña</strong>}
      footer={[
        <Button type="primary" key="close" onClick={handleCancel}>
          Cerrar
        </Button>,
      ]}
      maskClosable={false}
      visible={isModalVisible}
      onCancel={handleCancel}
    >
      <Spin size="large" spinning={loading}>
        <S.Descriptions title="Información del usuario" column={1}>
          <Descriptions.Item label="Nombre">{modalInfo.full_name}</Descriptions.Item>
          <Descriptions.Item label="Usuario">{modalInfo.username}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">{modalInfo.phone}</Descriptions.Item>
        </S.Descriptions>
        <p>El siguiente enlace permite restablecer la contraseña del usuario:</p>
        <S.Paragraph
          copyable={{
            icon: [
              <CopyOutlined key="copy-icon" style={{ fontSize: 24 }} />,
              <CheckOutlined key="copied-icon" style={{ fontSize: 24 }} />,
            ],
            tooltips: ['Copiar enlace', 'Copiado'],
          }}
        >
          {errorMsg ? <ErrorMessage /> : link}
        </S.Paragraph>
      </Spin>
    </Modal>
  );
};

export default ModalContent;
