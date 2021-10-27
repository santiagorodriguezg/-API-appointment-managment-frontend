import { Modal } from 'antd';
import Button from '../../../components/Button';
import DoctorAssign from './DoctorAssign';
import AppointmentDetail from './AppointmentDetail';

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
      {modalInfo?.doctor ? (
        <DoctorAssign appointment={modalInfo.record} />
      ) : (
        <AppointmentDetail appointment={modalInfo} />
      )}
    </Modal>
  );
};

export default ModalContent;
