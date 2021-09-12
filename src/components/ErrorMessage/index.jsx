import { Alert, Button } from 'antd';

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
          <Button type="primary" htmlType="button" onClick={() => window.location.reload(false)}>
            Reintentar
          </Button>
        </div>
      )}
    </>
  );
};
export default ErrorMessage;
