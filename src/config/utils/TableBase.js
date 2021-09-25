import { Component } from 'react';
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Button from '../../components/Button';
import { Colors } from '../../styles/Variables';

export default class TableBase extends Component {
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
      isModalVisible: false,
      modalInfo: {},
    };
  }

  handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }

  handleReset(clearFilters) {
    clearFilters();
    this.setState({ searchText: '' });
  }

  handleModalCancel() {
    this.setState({
      isModalVisible: false,
    });
  }

  handleTableChange(pag, filters, sorter) {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }

  getColumnSearchProps(title, dataIndex) {
    return {
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
    };
  }

  clearAllFilters() {
    this.setState({
      sortedInfo: null,
      filteredInfo: null,
      searchText: '',
      searchedColumn: '',
    });
  }

  showModal(record) {
    this.setState({
      isModalVisible: true,
      modalInfo: record,
    });
  }
}
