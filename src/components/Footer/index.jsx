import { Divider } from 'antd';
import S from './styles';

const Footer = () => {
  return (
    <S.Footer>
      <S.Content>
        <Divider />
        <p>
          Proyecto social con perspectiva de género. Espacio universitario de investigación y extensión, basado en la
          defensa de los Derechos Humanos.
        </p>
        <p>Casa de la Mujer UPTC ©{new Date().getFullYear()}. Todos los derechos reservados</p>
      </S.Content>
    </S.Footer>
  );
};

export default Footer;
