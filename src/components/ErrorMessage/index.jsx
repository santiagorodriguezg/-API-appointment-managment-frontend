import { Alert, Result } from 'antd';
import Button from '../Button';

const ErrorMessage = ({ retryBtn }) => {
  return (
    <>
      <Alert
        message="Error"
        description="Se ha producido un error, por favor intente más tarde. Si el problema persiste comuníquese con nosotros."
        type="error"
        showIcon
        style={{ margin: '16px 0' }}
      />
      {retryBtn && (
        <Button center $marginTop type="primary" htmlType="button" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      )}
    </>
  );
};

export const UserNotFound = () => {
  return (
    <Result
      status="404"
      title="Usuario no encontrado"
      extra={
        <Button type="primary" href="/users">
          Regresar a Usuarios
        </Button>
      }
    />
  );
};

export default ErrorMessage;
