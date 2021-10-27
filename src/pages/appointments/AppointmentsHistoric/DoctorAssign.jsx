import { useEffect, useState } from 'react';
import { Result, Select, Spin, Typography } from 'antd';
import { userRoles } from '../../../config/utils/enums';
import { arraysEquals } from '../../../config/utils';
import { AppointmentUserUpdateService } from '../../../services/Appointments';
import { UsersListService } from '../../../services/Users';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';

const { Title, Paragraph } = Typography;

const DoctorAssign = ({ appointment }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectDoctors, setSelectDoctors] = useState([]);
  const [initialDoctors, setInitialDoctors] = useState([]);
  const [disableSaveChanges, setDisableSaveChanges] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const getDoctors = async () => {
    try {
      setLoading(true);
      setDisableSaveChanges(true);

      const res = await UsersListService({ role: userRoles[1].value });

      const children = [];

      res.data.results.forEach(doctor => {
        children.push(<Select.Option key={doctor.username}>{doctor.full_name}</Select.Option>);
      });

      setDoctors(children);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrorMsg(true);
    }
  };

  const getInitialDoctors = () => {
    const defaultDoctors = [];
    if (appointment.doctors.length) {
      appointment.doctors.forEach(doctor => {
        defaultDoctors.push(doctor.username);
      });
    }
    setInitialDoctors(defaultDoctors);
  };

  useEffect(() => {
    getDoctors();
    getInitialDoctors();
  }, [appointment]);

  const handleChange = value => {
    if (value.length) {
      setDisableSaveChanges(false);
      setSelectDoctors(value);
    } else {
      setDisableSaveChanges(true);
    }
  };

  const updateAppointment = async data => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('doctors_username', data);

      const res = await AppointmentUserUpdateService(appointment.user.username, appointment.id, formData);
      appointment.doctors = res.data.doctors;

      setSuccessMsg(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setErrorMsg(true);
    }
  };

  const handleSubmit = async () => {
    if (arraysEquals(initialDoctors, selectDoctors)) {
      setDisableSaveChanges(true);
    } else {
      await updateAppointment(selectDoctors);
    }
  };

  return (
    <>
      <Title level={5}>Asignar doctores</Title>
      {errorMsg ? (
        <ErrorMessage />
      ) : (
        <Spin size="large" spinning={loading}>
          {!loading && successMsg && (
            <Result status="success" title={<Title level={5}>Los doctores se asignaron correctamente.</Title>} />
          )}

          {!loading && !successMsg && (
            <>
              <Paragraph>A continuación seleccione uno o mas doctores que estarán a cargo del caso.</Paragraph>
              <Select
                mode="multiple"
                showArrow
                allowClear
                style={{ width: '100%' }}
                placeholder="Seleccione uno o más doctores"
                defaultValue={initialDoctors}
                onChange={handleChange}
              >
                {doctors}
              </Select>
              <Button type="primary" $marginTop center ghost disabled={disableSaveChanges} onClick={handleSubmit}>
                Guardar cambios
              </Button>
            </>
          )}
        </Spin>
      )}
    </>
  );
};

export default DoctorAssign;
