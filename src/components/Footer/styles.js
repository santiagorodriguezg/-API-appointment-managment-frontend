import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

const FooterColors = {
  colorText: '#00000073',
  backgroundSocialButton: '#bdbdbd',
};

const S = {};

S.Footer = styled(Footer)`
  text-align: center;
  padding: 120px 0 0 0;
`;

S.ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.6);
`;

S.Content = styled.div`
  color: ${FooterColors.colorText};
  padding: 0 32px;
`;

S.Title = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: ${FooterColors.colorText};
  margin-bottom: 32px;
`;

S.SocialButton = styled(Button)`
  background: ${FooterColors.backgroundSocialButton};
  border-color: ${FooterColors.backgroundSocialButton};

  &:hover {
    background: #a7a7a7;
    border-color: ${FooterColors.backgroundSocialButton};
  }

  & > .anticon {
    align-items: center;
    height: 100%;
  }
`;

S.UniversityLink = styled(Link)`
  color: ${FooterColors.colorText};
  font-weight: 600;
`;

S.CopyRight = styled.p`
  margin: 0;
  padding-bottom: 1em;
`;

export default S;
