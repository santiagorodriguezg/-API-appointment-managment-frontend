import { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Descriptions, Modal, Space, Table, Tag } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import { AppointmentUserListService } from '../../services/Appointments';
import Dashboard from '../../components/Dashboard';
import { getFullDate } from '../../utils/Utils';
import S from '../../components/Dashboard/styles';

const AppointmentsHistoric = () => {
  const { username } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const getAppointmentsData = async (params = {}) => {
    try {
      console.log('PARAMS', params);
      setLoading(true);

      const res = await AppointmentUserListService(username, params);
      setPagination({
        ...pagination,
        total: res.data.count,
      });

      setLoading(false);
      console.log('RES', res);
      setData(res.data.results.appointments);
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const handleTableChange = (pag, filters, sorter) => {
    console.log('PAGINATION', pag);
    console.log('FILTERS', filters);
    console.log('SORTER', sorter);

    const ordering = sorter.column ? `${sorter.order === 'descend' ? '-' : ''}${sorter.field}` : null;

    getAppointmentsData({
      limit: pag.pageSize,
      offset: pag.current - 1,
      type: filters.type?.[0],
      ordering,
    });
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const showModal = record => {
    setIsModalVisible(true);
    setModalInfo(record);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const ModalContent = () => {
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
              const color = tag === 'PSY' ? 'green' : 'geekblue';
              const tagValue = tag === 'PSY' ? 'Psicosocial' : 'Jurídica';
              return (
                <Tag color={color} key={tag}>
                  {tagValue}
                </Tag>
              );
            })}
          </Descriptions.Item>

          <Descriptions.Item label={<strong>Hijos</strong>}>
            {modalInfo.children ? (
              <Descriptions column={1} style={{ paddingLeft: 24 }}>
                {modalInfo.children.map(child => {
                  return (
                    <Fragment key={modalInfo.id}>
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
              <Descriptions key={modalInfo.id} column={1} style={{ paddingLeft: 24 }}>
                <Descriptions.Item label={<strong>Nombre</strong>}>{modalInfo.aggressor.name}</Descriptions.Item>
                <Descriptions.Item label={<strong>Edad</strong>}>{modalInfo.aggressor.age}</Descriptions.Item>
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

  const columns = [
    {
      title: 'Tipo de cita',
      dataIndex: 'type',
      filters: [
        {
          text: 'Psicosocial',
          value: 'PSY',
        },
        {
          text: 'Jurídica',
          value: 'LEG',
        },
      ],
      filterMultiple: false,
      render(tags) {
        return (
          <>
            {/* eslint-disable-next-line react/destructuring-assignment */}
            {tags.map(tag => {
              const color = tag === 'PSY' ? 'green' : 'geekblue';
              const tagValue = tag === 'PSY' ? 'Psicosocial' : 'Jurídica';
              return (
                <Tag color={color} key={tag}>
                  {tagValue}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'created_at',
      sorter: true,
      render(text) {
        return getFullDate(text);
      },
    },
    {
      title: 'Audio',
      dataIndex: 'audio',
      // eslint-disable-next-line react/display-name
      render(text) {
        return (
          <Button type="link" shape="circle" icon={<PlayCircleOutlined />} href={text} target="_blank">
            Escuchar
          </Button>
        );
      },
    },
    {
      title: 'Acción',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>Ver detalles</Button>
        </Space>
      ),
    },
  ];

  // const role = true;
  //
  // if (role) {
  //   columns.unshift({
  //     title: 'Usuario',
  //     dataIndex: 'user',
  //     key: 'user',
  //     // eslint-disable-next-line react/display-name,react/destructuring-assignment
  //     render: u => <p>{u.first_name}</p>,
  //   });
  // }

  return (
    <Dashboard>
      <S.Title level={3}>Histórico de citas</S.Title>
      {isModalVisible && <ModalContent />}
      <Table
        rowKey="id"
        childrenColumnName="childrenTable"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
      />
    </Dashboard>
  );
};

export default AppointmentsHistoric;
