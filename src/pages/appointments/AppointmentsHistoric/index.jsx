import { Dropdown, Menu, Space, Table, Tag } from 'antd';
import {
  ClearOutlined,
  DownOutlined,
  MedicineBoxOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AuthContext from '../../../context/Auth';
import { AppointmentUserListService } from '../../../services/Appointments';
import { getShortDate } from '../../../config/utils';
import TableBase from '../../../config/utils/TableBase';
import Button from '../../../components/Button';
import Dashboard from '../../../components/Dashboard';
import ErrorMessage from '../../../components/ErrorMessage';
import DashboardStyles from '../../../components/Dashboard/styles';
import {
  appointmentTypes,
  getAppointmentTypeColor,
  getAppointmentTypeName,
  userRoles,
} from '../../../config/utils/enums';
import ModalContent from './ModalContent';

export default class AppointmentsHistoric extends TableBase {
  static contextType = AuthContext;

  componentDidMount() {
    this.getAppointmentsData();
  }

  getAppointmentsData = async (params = {}) => {
    try {
      this.setState({
        loading: true,
        errorMsg: false,
      });
      const { pagination } = this.state;
      const { user } = this.context;

      const res = await AppointmentUserListService(user.username, user.role, params);

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
      offset: (pag.current - 1) * pag.pageSize,
      type: filters.type?.[0],
      id: filters.id?.[0],
      user__identification_number: filters.identificationNumber?.[0],
      user__full_name: filters.fullName?.[0],
      ordering,
    });

    super.handleTableChange(pag, filters, sorter);
  };

  clearAllFilters = () => {
    super.clearAllFilters();
    const { pagination } = this.state;
    this.getAppointmentsData({ pagination });
  };

  render() {
    const { user } = this.context;
    const { loading, errorMsg, isModalVisible, modalInfo, data, pagination } = this.state;
    let { sortedInfo, filteredInfo } = this.state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columnsAdmin = [
      {
        title: 'Nombre',
        dataIndex: ['user', 'full_name'],
        key: 'fullName',
        width: 250,
        filteredValue: filteredInfo.fullName || null,
        ...this.getColumnSearchProps('nombre', 'full_name'),
      },
      {
        title: 'Documento',
        dataIndex: ['user', 'identification_number'],
        key: 'identificationNumber',
        width: 150,
        filteredValue: filteredInfo.identificationNumber || null,
        ...this.getColumnSearchProps('documento', 'identification_number'),
      },
    ];

    const columns = [
      {
        title: 'C??digo',
        dataIndex: 'id',
        key: 'id',
        width: 90,
        filteredValue: filteredInfo.id || null,
        ...this.getColumnSearchProps('c??digo', 'id'),
      },
      {
        title: 'Tipo de cita',
        dataIndex: 'type',
        key: 'type',
        width: 150,
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
        width: 150,
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
        render: text => getShortDate(text),
      },
      {
        title: 'Audio',
        dataIndex: 'audio',
        key: 'audio',
        width: 120,
        render: text => (
          <Button type="link" shape="circle" icon={<PlayCircleOutlined />} href={text} target="_blank">
            Escuchar
          </Button>
        ),
      },
      {
        title: 'Acci??n',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={() => this.showModal(record)}>Detalles</Button>
            {user.role === userRoles[0].value && (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key="1"
                      icon={<MedicineBoxOutlined />}
                      onClick={() =>
                        this.showModal({
                          doctor: true,
                          record,
                        })
                      }
                    >
                      Doctores
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
            )}
          </Space>
        ),
      },
    ];

    if (user.role !== userRoles[2].value) {
      columns.splice(1, 0, ...columnsAdmin);
    }

    return (
      <Dashboard>
        <DashboardStyles.Title level={3}>Hist??rico de citas</DashboardStyles.Title>
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
