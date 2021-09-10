import { useContext, useState } from 'react';
import { Button as ButtonAntd, Checkbox, Col, Divider, Form, Input, Result, Row, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import AuthContext from '../../context/Auth';
import Button from '../../components/Button';
import Dashboard from '../../components/Dashboard';
import InputNumber from '../../components/Input/InputNumber';
import ErrorMessage from '../../components/ErrorMessage';
import { AppointmentCreateService } from '../../services/Appointments';
import { getFieldErrors } from '../../utils/Utils';
import S from '../../components/Dashboard/styles';
import StyledGlobal from '../../styles/Global';

const AppointmentsCreate = () => {
  const [form] = Form.useForm();
  const { username } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aggressorInfo, setAggressorInfo] = useState(true);
  const [result, setResult] = useState(false);

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async values => {
    try {
      setErrorMsg(false);
      setResult(false);
      setLoading(true);

      const formData = new FormData();

      formData.append('type', values.type);
      formData.append('description', values.description);
      formData.append('children', values.children ? JSON.stringify(values.children) : null);
      formData.append('aggressor', values.aggressor ? JSON.stringify(values.aggressor) : null);
      formData.append('audio', values.audio ? values.audio[0].originFileObj : '');

      await AppointmentCreateService(username, formData);

      setLoading(false);
      setResult(true);
    } catch (e) {
      if (e.response) {
        setLoading(false);
        setErrorMsg(false);
        form.setFields(getFieldErrors(e.response.data.errors));
      } else {
        setLoading(false);
        setErrorMsg(true);
      }
    }
  };

  return (
    <Dashboard>
      <S.Title level={3} $center>
        Solicitar cita
      </S.Title>
      <StyledGlobal.ContainerForm shadow center width={600} marginTop={16}>
        {result ? (
          <Result
            status="success"
            title="Solicitud enviada"
            subTitle="Gracias por comunicarte con nosotros!. Te contactáremos lo más pronto posible."
            extra={[
              <ButtonAntd type="primary" key="historic" href="/appointments/historic">
                Histórico de citas
              </ButtonAntd>,
              <ButtonAntd key="create">Solicitar nueva cita</ButtonAntd>,
            ]}
          />
        ) : (
          <Form layout="vertical" name="create_appointment" form={form} onFinish={onFinish}>
            <Form.Item
              name="type"
              label="Tipo de cita"
              rules={[
                {
                  required: true,
                  message: 'Selecciona el tipo de cita',
                },
              ]}
            >
              <Checkbox.Group>
                <Checkbox value="PSY">Psicosocial</Checkbox>
                <Checkbox value="LEG">Jurídica</Checkbox>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item noStyle>
              <p>Hijos</p>
              <StyledGlobal.TextSecondary>
                Si tienes hijos haz clic en el botón <em>Agregar campo</em>.
              </StyledGlobal.TextSecondary>
            </Form.Item>

            <Form.List name="children">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row key={key} gutter={32}>
                      <Col xs={24} sm={17}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="Nombre completo"
                          fieldKey={[fieldKey, 'name']}
                          rules={[
                            {
                              required: true,
                              message: 'Introduce el nombre completo de tu hijo/a',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col xs={20} sm={5}>
                        <Form.Item
                          {...restField}
                          name={[name, 'age']}
                          label="Edad"
                          fieldKey={[fieldKey, 'age']}
                          rules={[
                            {
                              required: true,
                              message: 'Introduce la edad de tu hijo/a',
                            },
                          ]}
                        >
                          <InputNumber min={0} max={99} />
                        </Form.Item>
                      </Col>
                      <Col xs={4} sm={2}>
                        <Form.Item label=" ">
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <ButtonAntd type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Agregar campo
                    </ButtonAntd>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Divider />

            <Form.Item noStyle>
              <p>Datos del posible agresor</p>
              <StyledGlobal.TextSecondary>
                Si tienes datos de tu agresor o ex pareja haz clic en el botón <em>Agregar información</em>.
              </StyledGlobal.TextSecondary>
            </Form.Item>

            <Form.List name="aggressor">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Row key={key} gutter={32}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="Nombre completo"
                          fieldKey={[fieldKey, 'name']}
                          rules={[
                            {
                              required: true,
                              message: 'Introduce el nombre completo del posible agresor',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'identification_number']}
                          label="Documento de identidad"
                          fieldKey={[fieldKey, 'identification_number']}
                        >
                          <InputNumber min={1} />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'phone']}
                          label="Teléfono"
                          fieldKey={[fieldKey, 'phone']}
                        >
                          <InputNumber min={3} />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'address']}
                          label="Dirección"
                          fieldKey={[fieldKey, 'address']}
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col xs={24}>
                        <Form.Item
                          {...restField}
                          name={[name, 'more_info']}
                          label="Información adicional"
                          fieldKey={[fieldKey, 'more_info']}
                        >
                          <Input.TextArea
                            autoSize={{
                              minRows: 2,
                              maxRows: 10,
                            }}
                            placeholder="Otros datos como lugar de trabajo"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24}>
                        <Form.Item noStyle>
                          <ButtonAntd
                            id="btn_remove_aggressor_info"
                            type="dashed"
                            onClick={() => {
                              remove(name);
                              setAggressorInfo(true);
                            }}
                            block
                            icon={<MinusCircleOutlined />}
                          >
                            No tengo información
                          </ButtonAntd>
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                  {aggressorInfo && (
                    <Form.Item id="add_aggressor_info">
                      <ButtonAntd
                        type="dashed"
                        onClick={() => {
                          add();
                          setAggressorInfo(false);
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Agregar información
                      </ButtonAntd>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>

            <Divider />

            <Form.Item
              name="audio"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="Audio donde nos cuentes tu caso"
              extra="Los formatos permitidos son: .mp3, .mp4, .ogg, .m4a."
              rules={[
                {
                  required: true,
                  message: 'Selecciona el archivo de audio',
                },
              ]}
            >
              <Upload accept=".mp3,.mp4,.ogg,.m4a" listType="picture" maxCount={1} beforeUpload={() => false}>
                <ButtonAntd icon={<UploadOutlined />}>Seleccionar archivo</ButtonAntd>
              </Upload>
            </Form.Item>

            <Form.Item name="description" label="Datos adicionales de tu caso">
              <Input.TextArea
                autoSize={{
                  minRows: 2,
                  maxRows: 10,
                }}
              />
            </Form.Item>

            {errorMsg && (
              <Form.Item noStyle>
                <ErrorMessage />
              </Form.Item>
            )}

            <Form.Item>
              <Button block text="Enviar" type="primary" htmlType="submit" loading={loading} />
            </Form.Item>
          </Form>
        )}
      </StyledGlobal.ContainerForm>
    </Dashboard>
  );
};

export default AppointmentsCreate;
