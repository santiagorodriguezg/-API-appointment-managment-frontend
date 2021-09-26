import { Dropdown, Menu, Space, Table, Tag } from 'antd';
import { ClearOutlined, DownOutlined, EditOutlined, LinkOutlined, SettingOutlined } from '@ant-design/icons';
import { UsersListService } from '../../../services/Users';
import Button from '../../../components/Button';
import Dashboard from '../../../components/Dashboard';
import ErrorMessage from '../../../components/ErrorMessage';
import S from '../../../components/Dashboard/styles';
import { getShortDate } from '../../../config/utils';
import TableBase from '../../../config/utils/TableBase';
import { getRoleColor, getRoleName, userRoles } from '../../../config/utils/enums';
import ModalContent from './ModalContent';

export default class UsersList extends TableBase {
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

    super.handleTableChange(pag, filters, sorter);
  };

  clearAllFilters = () => {
    super.clearAllFilters();
    const { pagination } = this.state;
    this.getUsersData({ pagination });
  };

  render() {
    const { loading, errorMsg, isModalVisible, modalInfo, data, pagination } = this.state;
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
        render: record => (
          <Space size="middle">
            <Button>Detalles</Button>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" icon={<EditOutlined />}>
                    Editar
                  </Menu.Item>
                  <Menu.Item key="2" icon={<LinkOutlined />} onClick={() => this.showModal(record)}>
                    Restablecer contraseña
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
              placement="bottomRight"
              arrow
            >
              <Button>
                <SettingOutlined /> <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        ),
      },
    ];

    return (
      <Dashboard>
        <S.Title level={3}>Usuarios</S.Title>
        {isModalVisible && (
          <ModalContent
            isModalVisible={isModalVisible}
            modalInfo={modalInfo}
            handleCancel={() => this.handleModalCancel()}
          />
        )}
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
