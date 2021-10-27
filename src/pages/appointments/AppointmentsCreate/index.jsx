import { useContext, useState } from 'react';
import { Checkbox, Col, Divider, Form, Input, Result, Row, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import AuthContext from '../../../context/Auth';
import { getFieldErrors, IMAGE_EXTENSIONS, validateFileBeforeUpload } from '../../../config/utils';
import { appointmentMultimedia } from '../../../config/utils/enums';
import { AppointmentUserCreateService } from '../../../services/Appointments';
import Dashboard from '../../../components/Dashboard';
import InputNumber from '../../../components/Input/InputNumber';
import ErrorMessage from '../../../components/ErrorMessage';
import Button from '../../../components/Button';
import S from '../../../components/Dashboard/styles';
import StyledGlobal from '../../../styles/Global';

const AppointmentsCreate = () => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
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

  const onReset = () => {
    form.resetFields();
    setResult(false);
  };

  const onFinish = async values => {
    try {
      setErrorMsg(false);
      setResult(false);
      setLoading(true);

      const formData = new FormData();

      formData.append('type', values.type);
      formData.append('description', values.description || '');
      formData.append('children', values.children ? JSON.stringify(values.children) : null);
      formData.append('aggressor', values.aggressor ? JSON.stringify(values.aggressor[0]) : null);
      formData.append('audio', values.audio ? values.audio[0].originFileObj : '');

      if (values.multimedia.length) {
        values.multimedia.map((file, i) => {
          const fileExtension = IMAGE_EXTENSIONS.includes(file.originFileObj.type)
            ? appointmentMultimedia[0].value
            : appointmentMultimedia[1].value;

          formData.append(`multimedia[${i}]file`, file.originFileObj);
          formData.append(`multimedia[${i}]file_type`, fileExtension);
          return formData;
        });
      }

      await AppointmentUserCreateService(user.username, formData);

      setResult(true);
      setLoading(false);
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
      <StyledGlobal.Wrapper800>
        <S.Title level={3}>Solicitar cita</S.Title>
        <StyledGlobal.WrapperInner>
          <StyledGlobal.ContainerForm center width={600} marginTop={16}>
            {result ? (
              <Result
                status="success"
                title="Solicitud enviada"
                subTitle="Gracias por comunicarte con nosotros!. Te contactáremos lo más pronto posible."
                extra={[
                  <Button type="primary" key="historic" href="/appointments/historic">
                    Histórico de citas
                  </Button>,
                  <Button key="create" onClick={onReset}>
                    Solicitar nueva cita
                  </Button>,
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
                                  message: 'Ingresa el nombre completo de tu hijo/a',
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
                                  message: 'Ingresa la edad de tu hijo/a',
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
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Agregar campo
                        </Button>
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
                                  message: 'Ingresa el nombre completo del posible agresor',
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
                              rules={[
                                {
                                  pattern: /^([0-9])*$/,
                                  message: 'Ingresa un número de identificación valido',
                                },
                              ]}
                            >
                              <Input minLength={6} maxLength={10} />
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'phone']}
                              label="Teléfono"
                              fieldKey={[fieldKey, 'phone']}
                              rules={[
                                {
                                  pattern: /^3[0-9]{2} ?[0-9]{3} ?[0-9]{4}$/,
                                  message: 'Ingresa un número de teléfono valido',
                                },
                              ]}
                            >
                              <Input maxLength={12} />
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
                              <Button
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
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      ))}
                      {aggressorInfo && (
                        <Form.Item id="add_aggressor_info">
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              setAggressorInfo(false);
                            }}
                            block
                            icon={<PlusOutlined />}
                          >
                            Agregar información
                          </Button>
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
                  extra={
                    <>
                      Los formatos permitidos son: <strong>.mp3, .mp4, .ogg, .m4a</strong>.
                    </>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona el archivo de audio',
                    },
                  ]}
                >
                  <Upload
                    accept=".mp3,.mp4,.ogg,.m4a"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={file => {
                      const fileTypes = ['audio/mpeg', 'audio/mpeg-4', 'audio/ogg', 'audio/x-m4a'];
                      return validateFileBeforeUpload(fileTypes, file);
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  name="multimedia"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  label="Selecciona fotos y documentos en PDF como evidencia (opcional)"
                  extra={
                    <>
                      Los formatos permitidos son: <strong>.jpg, .jpeg, .png, .webp, .pdf</strong>.
                      <br />
                      Se permiten <strong>máximo 6</strong> archivos.
                    </>
                  }
                >
                  <Upload
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    listType="picture-card"
                    maxCount={6}
                    showUploadList={{ showPreviewIcon: false }}
                    beforeUpload={file => {
                      const fileTypes = [...IMAGE_EXTENSIONS, 'application/pdf'];
                      return validateFileBeforeUpload(fileTypes, file);
                    }}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Seleccionar</div>
                    </div>
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
                  <Button block type="primary" htmlType="submit" loading={loading}>
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            )}
          </StyledGlobal.ContainerForm>
        </StyledGlobal.WrapperInner>
      </StyledGlobal.Wrapper800>
    </Dashboard>
  );
};

export default AppointmentsCreate;
