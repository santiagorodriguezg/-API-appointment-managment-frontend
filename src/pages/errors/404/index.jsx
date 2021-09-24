import { Result, Button } from 'antd';

const Error404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Lo sentimos, la página que has visitado no existe."
      extra={
        <Button type="primary" href="/accounts/profile">
          Regresar a Mi cuenta
        </Button>
      }
    />
  );
};

export default Error404;
