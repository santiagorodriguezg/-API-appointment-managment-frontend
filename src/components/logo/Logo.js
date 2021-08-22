import logo from '../../assets/logo.jpg'
import { Div, Img } from './Logo.component'

const Logo = () => {
  return (
    <Div>
      <Img src={logo} alt='Casa de la Mujer Tunja' id='main-logo' />
    </Div>
  )
}

export default Logo
