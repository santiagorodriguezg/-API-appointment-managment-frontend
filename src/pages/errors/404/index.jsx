import { Result, Button } from 'antd';

const Error404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que ha visitado no existe."
      extra={
        <Button type="primary" href="/accounts/login">
          Regresar al inicio de sesión
        </Button>
      }
    />
  );
};

export default Error404;
