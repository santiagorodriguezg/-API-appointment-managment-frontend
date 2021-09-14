import { Component, Fragment } from 'react';
import { Button, Descriptions, Input, Modal, Space, Table, Tag } from 'antd';
import { ClearOutlined, PlayCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AuthContext from '../../context/Auth';
import { AppointmentUserListService } from '../../services/Appointments';
import Dashboard from '../../components/Dashboard';
import S from '../../components/Dashboard/styles';
import { getFullDate } from '../../config/utils';
import { appointmentTypes, getAppointmentTypeColor, getAppointmentTypeName, userRoles } from '../../config/utils/enums';
import Colors from '../../styles/Colors';

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
export default class AppointmentsHistoric extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      pagination: {},
      isModalVisible: false,
      modalInfo: {},
      searchText: '',
      searchedColumn: '',
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.getAppointmentsData({ pagination });
  }

  getAppointmentsData = async (params = {}) => {
    try {
      this.setState({ loading: true });
      const { pagination } = this.state;
      const { username, role } = this.context;

      const res = await AppointmentUserListService(username, role, params);

      this.setState({
        loading: false,
        data: res.data.results,
        pagination: {
          ...pagination,
          total: res.data.count,
        },
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  handleTableChange = (pag, filters, sorter) => {
    const ordering = sorter.column ? `${sorter.order === 'descend' ? '-' : ''}${sorter.field}` : null;
    this.getAppointmentsData({
      limit: pag.pageSize,
      offset: pag.current - 1,
      type: filters.type?.[0],
      user__identification_number: filters.identificationNumber?.[0],
      user__full_name: filters.fullName?.[0],
      ordering,
    });

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  getColumnSearchProps = (title, dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar ${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space size={24}>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpiar
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? Colors.primary : undefined }} />,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text => {
      const { searchedColumn, searchText } = this.state;
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  clearAllFilters = () => {
    const { pagination } = this.state;
    this.setState({
      sortedInfo: null,
      filteredInfo: null,
      searchText: '',
      searchedColumn: '',
    });
    this.getAppointmentsData({ pagination });
  };

  showModal = record => {
    this.setState({
      isModalVisible: true,
      modalInfo: record,
    });
  };

  handleModalCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const { role } = this.context;
    const { isModalVisible, modalInfo, data, pagination, loading } = this.state;
    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columnsAdmin = [
      {
        title: 'Nombre',
        dataIndex: ['user', 'full_name'],
        key: 'fullName',
        width: 300,
        filteredValue: filteredInfo.fullName || null,
        ...this.getColumnSearchProps('nombre', 'full_name'),
      },
      {
        title: 'Documento',
        dataIndex: ['user', 'identification_number'],
        key: 'identificationNumber',
        width: 230,
        filteredValue: filteredInfo.identificationNumber || null,
        ...this.getColumnSearchProps('documento', 'identification_number'),
      },
    ];

    const columns = [
      {
        title: 'Tipo de cita',
        dataIndex: 'type',
        key: 'type',
        filterMultiple: false,
        filters: appointmentTypes,
        filteredValue: filteredInfo.type || null,
        render: tags => (
          <>
            {tags.map(tag => (
              <Tag color={getAppointmentTypeColor(tag)} key={tag}>
                {getAppointmentTypeName(tag)}
              </Tag>
            ))}
          </>
        ),
      },
      {
        title: 'Fecha de solicitud',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
        render: text => getFullDate(text),
      },
      {
        title: 'Audio',
        dataIndex: 'audio',
        key: 'audio',
        render: text => (
          <Button type="link" shape="circle" icon={<PlayCircleOutlined />} href={text} target="_blank">
            Escuchar
          </Button>
        ),
      },
      {
        title: 'Acción',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => this.showModal(record)}>Ver detalles</Button>
          </Space>
        ),
      },
    ];

    if (role !== userRoles[2].value) {
      columns.unshift(...columnsAdmin);
    }

    return (
      <Dashboard>
        {isModalVisible && (
          <ModalContent isModalVisible={isModalVisible} modalInfo={modalInfo} handleCancel={this.handleModalCancel} />
        )}
        <S.Title level={3}>Histórico de citas</S.Title>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<ClearOutlined />} onClick={this.clearAllFilters}>
            Limpiar filtros
          </Button>
        </Space>
        <Table
          rowKey="id"
          childrenColumnName="childrenTable"
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={this.handleTableChange}
          scroll={{ x: true }}
          sticky
        />
      </Dashboard>
    );
  }
}
