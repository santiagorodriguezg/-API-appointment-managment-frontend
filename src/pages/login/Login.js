import './Login.css'
import logo from '../../assets/logo.jpg'

import {Form, Input, Button, Checkbox, Layout, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Layout.Content>
            <Row>
                <Col span={24}>
                    <img src={logo} alt="Casa de la Mujer Tunja" id="main-logo" style={{"height": 200}}/>
                    <div className="wrapper-form">
                        <h2>Iniciar sesión</h2>
                        <Form
                            name="login"
                            className="form-box"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <a className="login-form-forgot" href="">
                                    ¿Olvido su contraseña?
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Iniciar sesión
                                </Button>
                                ¿No tiene una cuenta? <a href="">Registrarme</a>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Layout.Content>

    );
};

export default Login;
