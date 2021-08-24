import { Alert } from 'antd';

const ErrorMessage = () => {
  return (
    <Alert
      message="Error"
      description="Se ha producido un error, por favor intente más tarde. Si el problema persiste comuníquese con nosotros."
      type="error"
      showIcon
      style={{ margin: '16px 0' }}
    />
  );
};
export default ErrorMessage;
