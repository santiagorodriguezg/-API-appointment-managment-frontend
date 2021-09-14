import { Card } from 'antd';
import styled from 'styled-components';
import Variables from '../../styles/Variables';

const S = {};

S.Card = styled(Card)`
  margin-bottom: ${Variables.marginBase};
  border-radius: ${Variables.borderRadiusBase};
  box-shadow: ${Variables.boxShadowBase};

  .ant-card-body a:last-of-type {
    border-bottom: none;
  }
`;

S.ListItem = styled.a`
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  text-decoration: none;
  padding: 20px;
  cursor: ${props => (props.href ? 'pointer' : 'default')};
  color: initial;

  &:hover {
    background-color: #f8f9fa;
  }

  &:active {
    background-color: #e9ecef;
  }
`;

S.Title = styled.p`
  margin: 0;
  color: #424242;
  font-weight: 600;
`;

S.Content = styled.p`
  margin: 0;
  color: initial;
`;

S.Icon = styled.div`
  text-align: center;
  color: initial;
`;

export default S;
