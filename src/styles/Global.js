import styled, { css } from 'styled-components';
import Colors from './Colors';

const StyledGlobal = {};

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

StyledGlobal.WrapperContent840 = styled.div`
  max-width: 840px;
  margin: auto;
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
      border-radius: 6px;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;

      @media (min-width: 480px) {
        padding: 24px;
        //box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
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
  margin-top: 24px;

  button.ant-btn-text {
    color: ${Colors.primary};

    &:hover {
      color: ${Colors.primary};
      background: rgba(${Colors.primaryRGB}, 0.1);
    }
  }

  button {
    margin: 0 0 0 24px;
  }
`;

StyledGlobal.TextSecondary = styled.p`
  color: rgba(0, 0, 0, 0.65);
`;

export default StyledGlobal;
