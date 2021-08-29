import { Card } from 'antd';
import styled from 'styled-components';

const S = {};

S.Card = styled(Card)`
  margin-bottom: 24px;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);

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
