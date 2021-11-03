import { Card } from 'antd';
import styled, { createGlobalStyle, css } from 'styled-components';
import Variables, { Colors } from './Variables';

const StyledGlobal = {};

// Global application styles
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #262626;

    @media (min-width: 992px) {
      width: 100% !important;
      overflow: auto !important;
    }
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  #root {
    height: 100%;
  }

  // Ant design tooltip
  .ant-tooltip-inner > a {
    color: white;
  }

  // antd-img-crop
  .reactEasyCrop_CropArea {
    border-radius: 50%;
  }
`;

StyledGlobal.Container = styled.div`
  padding: 0 15px;
  width: 100%;
`;

StyledGlobal.Wrapper = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  display: flex;
  flex-direction: column;
`;

StyledGlobal.WrapperContent = styled.div`
  flex-grow: 1;
  background: ${Colors.bgBody};
  padding: 0 12px;

  @media (min-width: 768px) {
    padding: 0 24px;
  }
  @media (min-width: 992px) {
    padding: 0 48px;
  }
`;

StyledGlobal.Wrapper800 = styled.div`
  max-width: 800px;
  margin: auto;
`;

StyledGlobal.WrapperInner = styled.div`
  background: #fff;
  border-radius: ${Variables.borderRadiusBase};
  padding-top: ${Variables.paddingBase};
  margin-bottom: ${Variables.marginBase};
  box-shadow: ${Variables.boxShadowBase};
`;

StyledGlobal.ContainerForm = styled.div`
  padding: 12px;
  width: 100%;
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : '60px')};

  @media (min-width: 576px) {
    width: 500px;
  }

  ${props =>
    props.width <= 480 &&
    css`
      @media (min-width: 480px) {
        width: ${p => `${p.width}px`};
      }
    `}

  ${props =>
    props.width >= 600 &&
    css`
      @media (min-width: 615px) {
        width: ${p => `${p.width}px`};
      }
    `}

  ${props =>
    props.center &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};

  ${props =>
    props.shadow &&
    css`
      background: #fff;
      border-radius: ${Variables.borderRadiusBase};
      box-shadow: ${Variables.boxShadowBase};
      //box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;

      @media (min-width: 480px) {
        padding: ${Variables.paddingBase};
        //border: 1px solid #dadce0;
      }
    `};
`;

StyledGlobal.TitleForm = styled.h2`
  text-align: center;
  margin: 1em 0;
  font-size: 24px;
`;

StyledGlobal.PForm = styled.p`
  margin: 16px 0;
  text-align: center;
`;

StyledGlobal.CancelAndSaveBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${Variables.marginBase};

  .ant-btn-text {
    color: ${Colors.primary};

    &:hover {
      color: ${Colors.primary};
      background: rgba(${Colors.primaryRGB}, 0.1);
    }
  }

  button {
    margin-left: ${Variables.marginBase};
  }
`;

StyledGlobal.CardBase = styled(Card)`
  border-radius: ${Variables.borderRadiusBase};
  box-shadow: ${Variables.boxShadowBase};
`;

StyledGlobal.TextSecondary = styled.p`
  color: rgba(0, 0, 0, 0.65);
`;

export default StyledGlobal;
