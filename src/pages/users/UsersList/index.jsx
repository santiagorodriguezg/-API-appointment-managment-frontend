import crypto from 'crypto';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space, Table, Tag } from 'antd';
import {
  ClearOutlined,
  DownOutlined,
  EditOutlined,
  LinkOutlined,
  MessageOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import AuthContext from '../../../context/Auth';
import { UsersListService } from '../../../services/Users';
import { getShortDate } from '../../../config/utils';
import TableBase from '../../../config/utils/TableBase';
import { getRoleColor, getRoleName, userRoles } from '../../../config/utils/enums';
import Button from '../../../components/Button';
import Dashboard from '../../../components/Dashboard';
import ErrorMessage from '../../../components/ErrorMessage';
import DashboardStyles from '../../../components/Dashboard/styles';
import ModalContent from './ModalContent';
import { GetMyChatsService } from '../../../services/Chat';
import S from './styles';

export default class UsersList extends TableBase {
  static contextType = AuthContext;

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
      const { user } = this.context;

      const res = await UsersListService(params);
      const resChat = await GetMyChatsService(user.username);

      this.setState({
        loading: false,
        data: res.data.results,
        rooms: resChat.data.results.rooms,
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

  getChatLink = record => {
    const { rooms } = this.state;
    const { user } = this.context;
    let isNewChat = false;
    let roomName = null;

    rooms.forEach(room => {
      if (room?.user_owner?.username === record.username || room?.user_receiver?.username === record.username) {
        roomName = room.name;
      }
    });

    if (!roomName) {
      roomName = crypto.randomBytes(16).toString('hex');
      isNewChat = true;
    }

    const linkProps = {
      pathname: `/chat/${roomName}`,
      state: {
        chatRoom: {
          roomName,
          username: record.username,
          title: record.full_name,
          avatar: record.picture,
          isNewChat,
        },
      },
    };

    return (
      <Menu.Item key="2" icon={<MessageOutlined />} disabled={record.username === user.username}>
        <Link to={linkProps}>Chat</Link>
      </Menu.Item>
    );
  };

  render() {
    const { loading, errorMsg, isModalVisible, modalInfo, data, pagination } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    const { user } = this.context;

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
        render: email => <>{email !== null ? email : '-'}</>,
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
        width: 130,
        render: phone => <>{phone !== null ? phone : '-'}</>,
      },
      {
        title: 'Rol',
        dataIndex: 'role',
        key: 'role',
        width: 130,
        filterMultiple: false,
        filters: userRoles,
        filteredValue: filteredInfo.role || null,
        render: role => <Tag color={getRoleColor(role)}>{getRoleName(role)}</Tag>,
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
            <Button href={`/users/${record.username}`}>Detalles</Button>
            <Dropdown
              overlay={
                <Menu>
                  {user.role === userRoles[0].value && (
                    <Menu.Item key="1" icon={<EditOutlined />}>
                      <Link to={`/users/${record.username}/edit`}>Editar</Link>
                    </Menu.Item>
                  )}
                  {this.getChatLink(record)}
                  {user.role === userRoles[0].value && (
                    <Menu.Item key="3" icon={<LinkOutlined />} onClick={() => this.showModal(record)}>
                      Restablecer contraseña
                    </Menu.Item>
                  )}
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
        <DashboardStyles.Title level={3}>Usuarios</DashboardStyles.Title>
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
            <S.Buttons>
              <Button
                icon={<ClearOutlined />}
                onClick={this.clearAllFilters}
                style={{ marginBottom: 16 }}
                loading={loading}
              >
                Limpiar filtros
              </Button>
              {user.role === userRoles[0].value && (
                <Button icon={<UserAddOutlined />} style={{ marginBottom: 16 }} href="/users/create">
                  Crear usuario
                </Button>
              )}
            </S.Buttons>
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
