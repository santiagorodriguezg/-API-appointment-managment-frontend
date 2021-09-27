import { Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import Variables, { Colors } from '../../../styles/Variables';

const { Title } = Typography;
const S = {};

S.Row = styled(Row)`
  margin-bottom: 16px;
`;

S.Col = styled(Col)`
  font-weight: 600;
`;

S.Card = styled.div`
  margin-top: 16px;
  box-shadow: ${Variables.boxShadowBase};
  margin-bottom: ${Variables.marginBase};
`;

S.UpperContainer = styled.div`
  height: 120px;
  background: ${Colors.primary};
  position: relative;
  border-top-left-radius: ${Variables.borderRadiusBase};
  border-top-right-radius: ${Variables.borderRadiusBase};
`;

S.ImageContaier = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  top: 45px;
  left: calc(50% - 70px);
  background: white;
  border-radius: 50%;
  padding: 5px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (min-width: 576px) {
    left: 50px;
  }
  @media (min-width: 992px) {
    left: 100px;
  }
`;

S.LowerContainer = styled.div`
  background: white;
  border-bottom-left-radius: ${Variables.borderRadiusBase};
  border-bottom-right-radius: ${Variables.borderRadiusBase};
  padding: 80px 20px 40px 20px;

  @media (min-width: 576px) {
    padding: 32px 50px 40px 50px;
  }
  @media (min-width: 992px) {
    padding: 32px 100px 40px 100px;
  }
`;

S.Title = styled(Title)`
  text-align: center;
  padding-bottom: 32px;

  @media (min-width: 576px) {
    text-align: left;
    padding-left: 160px;
  }
`;

export default S;
