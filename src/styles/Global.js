import styled from 'styled-components';

const SG = {};

SG.Container = styled.div`
  padding: 0 12px;
  box-sizing: border-box;
`;

SG.ContainerForm = styled(SG.Container)`
  margin: 0 auto;
  width: 400px;
`;

SG.TitleForm = styled.h2`
  text-align: center;
`;

SG.PForm = styled.p`
  margin: 16px 0;
`;

export default SG;
