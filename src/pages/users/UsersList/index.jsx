import { Component } from 'react';
import { Input, Space, Table, Tag } from 'antd';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { UsersListService } from '../../../services/Users';
import Button from '../../../components/Button';
import Dashboard from '../../../components/Dashboard';
import ErrorMessage from '../../../components/ErrorMessage';
import S from '../../../components/Dashboard/styles';
import { getShortDate } from '../../../config/utils';
import { getRoleColor, getRoleName, userRoles } from '../../../config/utils/enums';
import { Colors } from '../../../styles/Variables';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMsg: false,
      data: [],
      pagination: {},
      searchText: '',
      searchedColumn: '',
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  componentDidMount() {
    const { pagination } = this.state;
    this.getUsersData({ pagination });
  }

  getUsersData = async (params = {}) => {
    try {
      this.setState({
        loading: true,
        errorMsg: false,
      });
      const { pagination } = this.state;

      const res = await UsersListService(params);

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
    this.getUsersData({
      limit: pag.pageSize,
      offset: pag.current - 1,
      role: filters.role?.[0],
      username: filters.username?.[0],
      full_name: filters.fullName?.[0],
      identification_number: filters.identificationNumber?.[0],
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
    this.getUsersData({ pagination });
  };

  render() {
    const { loading, errorMsg, data, pagination } = this.state;
    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'full_name',
        key: 'fullName',
        width: 200,
        filteredValue: filteredInfo.fullName || null,
        ...this.getColumnSearchProps('nombre', 'full_name'),
      },
      {
        title: 'Usuario',
        dataIndex: 'username',
        key: 'username',
        width: 100,
        filteredValue: filteredInfo.username || null,
        ...this.getColumnSearchProps('usuario', 'username'),
      },
      {
        title: 'Documento',
        dataIndex: 'identification_number',
        key: 'identificationNumber',
        width: 130,
        filteredValue: filteredInfo.identificationNumber || null,
        ...this.getColumnSearchProps('documento', 'identification_number'),
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
        width: 130,
      },
      {
        title: 'Rol',
        dataIndex: 'role',
        key: 'role',
        width: 130,
        filterMultiple: false,
        filters: userRoles,
        filteredValue: filteredInfo.role || null,
        render: role => (
          <Tag color={getRoleColor(role)} key={role}>
            {getRoleName(role)}
          </Tag>
        ),
      },
      {
        title: 'Fecha de registro',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 150,
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
        render: text => getShortDate(text),
      },
      {
        title: 'Acción',
        key: 'action',
        width: 200,
        render: () => (
          <Space size="middle">
            <Button>Ver detalles</Button>
          </Space>
        ),
      },
    ];

    return (
      <Dashboard>
        <S.Title level={3}>Usuarios</S.Title>
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
              scroll={{ x: '100%' }}
              sticky
            />
          </>
        )}
      </Dashboard>
    );
  }
}
