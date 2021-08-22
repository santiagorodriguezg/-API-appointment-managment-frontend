import './Login.css'

import { Alert, Button, Col, Form, Input, Layout, Row } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../../components/logo/Logo'
import { LoginService } from '../../services/auth/AuthService'
import useLocalStorage from '../../libs/storage'
import { useState } from 'react'

const Login = () => {
  const [token, setToken] = useLocalStorage('token', null)
  const [loginError, setLoginError] = useState({ error: false, msg: '' })

  const onFinish = async (values) => {
    console.log('Received values of form: ', values)

    const res = await LoginService(values)
    if (!res.err) {
      console.log('TODO BIEN', res)
      setLoginError({ error: false, msg: '' })
      setToken(res.access)

    } else {
      console.log('ERROR', res)
      setLoginError({ error: true, msg: res.data.detail })
    }
  }

  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <Logo />
          <div className='wrapper-form'>
            <h2>Iniciar sesión</h2>
            {
              loginError.error && <Alert message={loginError.msg} type='error' showIcon />
            }
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
                    message: 'Escribe el nombre de usuario',
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
                    message: 'Por favor, introduce tu contraseña',
                  },
                ]}
              >
                <Input.Password
                  placeholder='Contraseña'
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
