import './Header.css'
import React from 'react'

import { Button, Drawer, Layout, Radio, Space } from 'antd'

const { Content } = Layout

class HeaderC extends React.Component {
  state = { visible: false, placement: 'left' }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChange = e => {
    this.setState({
      placement: e.target.value,
    })
  }

  render() {
    const { placement, visible } = this.state
    return (
      <Layout>
        <Content>
          <p>HOla</p>
        </Content>
        <Space>
          <Radio.Group defaultValue={placement} onChange={this.onChange}>
            <Radio value='left'>left</Radio>
          </Radio.Group>
          <Button type='primary' onClick={this.showDrawer}>
            Open
          </Button>
        </Space>
        <Drawer
          title='Basic Drawer'
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Layout>
    )
  }
}

export default HeaderC
