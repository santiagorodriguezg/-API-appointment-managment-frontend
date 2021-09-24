import { Result, Button } from 'antd';

const Error403 = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Lo sentimos, no estás autorizado a acceder a esta página."
      extra={
        <Button type="primary" href="/accounts/profile">
          Regresar a Mi cuenta
        </Button>
      }
    />
  );
};

export default Error403;
