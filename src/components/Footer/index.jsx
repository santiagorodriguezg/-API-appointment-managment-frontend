import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Space, Tooltip } from 'antd';
import S from './styles';

const Footer = () => {
  return (
    <S.Footer>
      <S.ContentWrapper>
        <Divider />
        <S.Content>
          <p>
            Proyecto social con perspectiva de género. Espacio universitario de investigación y extensión, basado en la
            defensa de los Derechos Humanos.
          </p>
          <Divider />
          <Row justify="center">
            <Col span={24}>
              <S.Title>Desarrolladores</S.Title>
            </Col>
            <Col xs={24} sm={12} xl={6} style={{ marginBottom: 24 }}>
              <p>Luis Guillermo Gómez Galeano</p>
              <Space size="large">
                <Tooltip title="Linkedin">
                  <S.SocialButton
                    type="primary"
                    shape="circle"
                    icon={<LinkedinOutlined />}
                    href="https://www.linkedin.com/in/luis-guillermo-gomez-galeano/"
                    target="_blank"
                  />
                </Tooltip>
                <Tooltip title="GitHub">
                  <S.SocialButton
                    type="primary"
                    shape="circle"
                    icon={<GithubOutlined />}
                    href="https://github.com/luisgomez29"
                    target="_blank"
                  />
                </Tooltip>
                <Tooltip title="Correo electrónico">
                  <S.SocialButton
                    type="primary"
                    shape="circle"
                    icon={<MailOutlined />}
                    href="mailto:luis.gomez@usantoto.edu.co"
                    target="_blank"
                  />
                </Tooltip>
              </Space>
            </Col>
            <Col xs={24} sm={12} xl={6} style={{ marginBottom: 24 }}>
              <p>Santiago Andrés Rodríguez Garcés</p>
              <Space size="large">
                <Tooltip title="Linkedin">
                  <S.SocialButton
                    type="primary"
                    shape="circle"
                    icon={<LinkedinOutlined />}
                    href="https://www.linkedin.com/in/santiago-andres-rodr%C3%ADguez-garc%C3%A9s-39b094120/"
                    target="_blank"
                  />
                </Tooltip>
                <Tooltip title="GitHub">
                  <S.SocialButton
                    type="primary"
                    shape="circle"
                    icon={<GithubOutlined />}
                    href="https://github.com/ssaannttyy20"
                    target="_blank"
                  />
                </Tooltip>
                <Tooltip title="Correo electrónico">
                  <S.SocialButton
                    type="primary"
                    shape="circle"
                    icon={<MailOutlined />}
                    href="mailto:santiago.rodriguezg@usantoto.edu.co"
                    target="_blank"
                  />
                </Tooltip>
              </Space>
            </Col>
            <Col span={24} style={{ marginTop: 32 }}>
              <S.UniversityLink to={{ pathname: 'https://www.ustatunja.edu.co/' }} target="_blank">
                Universidad Santo Tomás - Tunja
              </S.UniversityLink>
            </Col>
          </Row>
          <Divider />
          <S.CopyRight>Casa de la Mujer UPTC ©{new Date().getFullYear()}. Todos los derechos reservados</S.CopyRight>
        </S.Content>
      </S.ContentWrapper>
    </S.Footer>
  );
};

export default Footer;
