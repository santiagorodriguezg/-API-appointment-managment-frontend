import { Space, Table, Tag } from 'antd';
import Dashboard from '../../components/Dashboard';
import S from '../../components/Dashboard/styles';

const AppointmentsHistoric = () => {
  const columns = [
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      // eslint-disable-next-line react/display-name
      render: text => <p>{text}</p>,
    },
    {
      title: 'Tipo de cita',
      dataIndex: 'type',
      key: 'type',
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
      key: 'created_at',
      render(text) {
        const d = new Date(text).toLocaleDateString('es-co', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
        return <p>{d}</p>;
      },
    },
    {
      title: 'Acción',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text, record) => (
        <Space size="middle">
          <p>Invite {record.id}</p>
          <p>Delete</p>
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

  const data = [
    {
      id: 1,
      user: {
        first_name: 'Juan',
        last_name: 'Moreno',
        username: 'juan',
        picture: null,
      },
      doctor: null,
      type: ['PSY', 'LEG'],
      children: [
        {
          age: 14,
          name: 'Maria Hernandez',
        },
        {
          age: 8,
          name: 'Ana Hernandez',
        },
      ],
      aggressor: [
        {
          name: 'Juan Moreno',
          phone: 3143498163,
          address: 'Tunja',
          more_info: 'Lugar de trabajo: Claro',
          identification_number: 1007143234,
        },
      ],
      description: 'No tengo datos',
      audio: null,
      start_date: null,
      end_date: null,
      created_at: '2021-09-10 21:16:37.951541 +00:00',
      updated_at: '2021-04-12T17:56:04.356851-05:00',
    },
    {
      id: 2,
      user: {
        first_name: 'Juan',
        last_name: 'Moreno',
        username: 'juan',
        picture: null,
      },
      doctor: {
        first_name: 'Carlos',
        last_name: 'Perez',
        username: 'carlos',
        picture: null,
      },
      type: ['LEG'],
      children: null,
      aggressor: null,
      description: 'Violencia intrafamiliar',
      audio: null,
      start_date: null,
      end_date: null,
      created_at: '2021-04-11T10:48:40.920204-05:00',
      updated_at: '2021-04-12T17:40:30.033680-05:00',
    },
    {
      id: 3,
      user: {
        first_name: 'Luis Guillermo',
        last_name: 'Gómez',
        username: 'luis',
        picture: null,
      },
      doctor: null,
      type: ['LEG', 'PSY'],
      children: [
        {
          age: '23',
          name: 'Luis',
        },
      ],
      aggressor: [
        {
          name: 'asda',
          phone: '31434',
          address: 'Tunja',
          identification_number: '1007141532',
        },
      ],
      description: 'Descripción',
      audio: 'http://localhost:8000/media/appointments/audio/AUDIO-2021-09-10-09-44-03.m4a',
      start_date: null,
      end_date: null,
      created_at: '2021-09-10T12:21:51.317411-05:00',
      updated_at: '2021-09-10T12:21:51.317411-05:00',
    },
  ];

  return (
    <Dashboard>
      <S.Title level={3}>Histórico de citas</S.Title>

      <Table columns={columns} dataSource={data} rowKey="id" childrenColumnName="childrenTable" />
    </Dashboard>
  );
};

export default AppointmentsHistoric;
