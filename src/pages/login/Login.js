import './Login.css'

import { Button, Col, Form, Input, Layout, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../../components/logo/Logo'

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <Logo />
          <div className='wrapper-form'>
            <h2>Iniciar sesión</h2>
            <Form
              name='login'
              className='form-box'
              onFinish={onFinish}
            >
              <Form.Item
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <a className='login-form-forgot' href=''>
                  ¿Olvido su contraseña?
                </a>
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  Iniciar sesión
                </Button>
                ¿No tienes una cuenta? <Link to='/signup'>Registrate</Link>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout.Content>
  )
}

export default Login
