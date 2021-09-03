import { Alert } from 'antd';
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
        <div style={{ textAlign: 'center' }}>
          <Button text="Reintentar" type="primary" htmlType="button" onClick={() => window.location.reload(false)} />
        </div>
      )}
    </>
  );
};
export default ErrorMessage;
