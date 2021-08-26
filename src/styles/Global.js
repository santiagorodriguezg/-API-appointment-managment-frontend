import styled from 'styled-components';

const StyledGlobal = {};

StyledGlobal.Container = styled.div`
  padding: 0 12px;
  box-sizing: border-box;
`;

StyledGlobal.ContainerForm = styled(StyledGlobal.Container)`
  margin: 50px auto;
  width: 400px;
`;

StyledGlobal.TitleForm = styled.h2`
  text-align: center;
  margin: 1em 0;
`;

StyledGlobal.PForm = styled.p`
  margin: 16px 0;
  text-align: center;
`;

export default StyledGlobal;
