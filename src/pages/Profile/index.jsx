import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import Dashboard from '../../components/Dashboard';

const { Option } = Select;

const Profile = () => {
  return (
    <Dashboard>
      <h1>Pagina de perfil</h1>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="first_name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su nombre',
                },
                {
                  whitespace: true,
                  message: 'Ingrese su nombre',
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="last_name"
              label="Apellidos"
              rules={[
                {
                  required: true,
                  message: 'Ingrese sus apellidos',
                },
                {
                  whitespace: true,
                  message: 'Ingrese sus apellidos',
                },
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="identification_type" label="Tipo de identificación">
              <Select placeholder="Seleccione un tipo de identificación" defaultValue="CC">
                <Option value="CC">Cédula de ciudadanía</Option>
                <Option value="CE">Cédula de extranjería</Option>
                <Option value="NIT">Nit</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="identification_number"
              label="Número de identificación"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su número de identificación',
                },
              ]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Usuario"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su usuario',
                },
                {
                  whitespace: true,
                  message: 'Ingrese su usuario',
                },
              ]}
            >
              <Input maxLength={40} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[
                {
                  type: 'email',
                  message: 'El correo electrónico ingresado no es válido',
                },
              ]}
            >
              <Input maxLength={60} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Celular"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su número de celular',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="city"
              label="Cuidad"
              rules={[
                {
                  required: true,
                  message: 'Ingrese el nombre de la ciudad',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="neighborhood" label="Barrio">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="address" label="Dirección">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter url description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter url description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Dashboard>
  );
};
export default Profile;
