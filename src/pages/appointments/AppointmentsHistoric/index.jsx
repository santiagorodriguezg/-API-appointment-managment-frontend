import { Component } from 'react';
import { Input, Space, Table, Tag } from 'antd';
import { ClearOutlined, PlayCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AuthContext from '../../../context/Auth';
import { AppointmentUserListService } from '../../../services/Appointments';
import Button from '../../../components/Button';
import Dashboard from '../../../components/Dashboard';
import { getFullDate } from '../../../config/utils';
import S from '../../../components/Dashboard/styles';
import { Colors } from '../../../styles/Variables';
import {
  appointmentTypes,
  getAppointmentTypeColor,
  getAppointmentTypeName,
  userRoles,
} from '../../../config/utils/enums';
import ModalContent from './ModalContent';
import ErrorMessage from '../../../components/ErrorMessage';

export default class AppointmentsHistoric extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMsg: false,
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
      this.setState({
        loading: true,
        errorMsg: false,
      });
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
      this.setState({
        loading: false,
        errorMsg: true,
      });
    }
  };

  handleTableChange = (pag, filters, sorter) => {
    const ordering = sorter.column ? `${sorter.order === 'descend' ? '-' : ''}${sorter.field}` : null;
    this.getAppointmentsData({
      limit: pag.pageSize,
      offset: pag.current - 1,
      type: filters.type?.[0],
      id: filters.id?.[0],
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
    const { loading, errorMsg, isModalVisible, modalInfo, data, pagination } = this.state;
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
        title: 'Código',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
        width: 150,
        filteredValue: filteredInfo.fullName || null,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        ...this.getColumnSearchProps('código', 'id'),
      },
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
      columns.splice(1, 0, ...columnsAdmin);
    }

    return (
      <Dashboard>
        {isModalVisible && (
          <ModalContent isModalVisible={isModalVisible} modalInfo={modalInfo} handleCancel={this.handleModalCancel} />
        )}
        <S.Title level={3}>Histórico de citas</S.Title>
        {errorMsg ? (
          <ErrorMessage retryBtn />
        ) : (
          <>
            <Button
              icon={<ClearOutlined />}
              onClick={this.clearAllFilters}
              style={{ marginBottom: 16 }}
              loading={loading}
            >
              Limpiar filtros
            </Button>
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
          </>
        )}
      </Dashboard>
    );
  }
}
