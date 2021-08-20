import React from 'react'
import { Button, Col, Form, Input, Layout, Row, Select } from 'antd'
import logo from '../../assets/logo.jpg'
import './Signup.css'
import { Link } from 'react-router-dom'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 7,
    },
  },
}


const SignUp = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }


  return (
    <Layout.Content>
      <Row>
        <Col span={24}>
          <div className='wrapper-form wrapper-form-signup'>
            <Form
              {...formItemLayout}
              form={form}
              name='signup'
              className='form-box'
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item {...tailFormItemLayout}>
                <div style={{ margin: '20px 0' }}>
                  <img src={logo} alt='Casa de la Mujer Tunja' id='main-logo'
                       style={{ height: 150, display: 'block', margin: 'auto' }} />
                </div>
                <h2 style={{ margin: '0' }}>Crear cuenta</h2>
              </Form.Item>
              <Form.Item
                name='first_name'
                label='Nombre'
                rules={[
                  {
                    required: true,
                    message: 'Ingrese su nombre',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='last_name'
                label='Apellidos'
                rules={[
                  {
                    required: true,
                    message: 'Ingrese sus apellidos',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='username'
                label='Usuario'
                rules={[
                  {
                    required: true,
                    message: 'Ingrese su usuario',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/*<Form.Item name='identification_type' label='Tipo de identificación'>*/}
              {/*  <Select*/}
              {/*    placeholder='Seleccione un tipo de identificación'*/}
              {/*    defaultValue='CC'*/}
              {/*  >*/}
              {/*    <Option value='CC'>Cédula de ciudadanía</Option>*/}
              {/*    <Option value='CE'>Cédula de extranjería</Option>*/}
              {/*  </Select>*/}
              {/*</Form.Item>*/}

              {/*<Form.Item*/}
              {/*  name='identification_number'*/}
              {/*  label='Número de identificación'*/}
              {/*  rules={[*/}
              {/*    {*/}
              {/*      required: true,*/}
              {/*      message: 'Ingrese su número de identificación',*/}
              {/*    },*/}
              {/*  ]}*/}
              {/*>*/}
              {/*  <InputNumber min={1} style={{ width: '100%' }} />*/}
              {/*</Form.Item>*/}

              <Form.Item
                name='email'
                label='Correo electrónico'
                rules={[
                  {
                    type: 'email',
                    message: 'El correo electrónico ingresado no es válido',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/*<Form.Item*/}
              {/*  name='phone'*/}
              {/*  label='Celular'*/}
              {/*  rules={[*/}
              {/*    {*/}
              {/*      required: true,*/}
              {/*      message: 'Ingrese su número de celular',*/}
              {/*    },*/}
              {/*  ]}*/}
              {/*>*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              {/*<Form.Item*/}
              {/*  name='city'*/}
              {/*  label='Cuidad'*/}
              {/*  rules={[*/}
              {/*    {*/}
              {/*      required: true,*/}
              {/*      message: 'Ingrese el nombre de la ciudad',*/}
              {/*    },*/}
              {/*  ]}*/}
              {/*>*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              {/*<Form.Item*/}
              {/*  name='neighborhood'*/}
              {/*  label='Barrio'*/}
              {/*>*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              {/*<Form.Item*/}
              {/*  name='address'*/}
              {/*  label='Dirección'*/}
              {/*>*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: 'Ingrese su contraseña',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Confirme su contraseña',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Las dos contraseñas ingresadas no coinciden'))
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item  {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  Registrarme
                </Button>
                ¿Ya tienes cuenta? <Link to='/login'>Ingresa aquí</Link>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout.Content>
  )
}

export default SignUp
