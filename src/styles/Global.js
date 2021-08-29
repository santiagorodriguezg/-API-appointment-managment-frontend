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

StyledGlobal.WrapperContent = styled.div`
  flex-grow: 1;
  padding: 0 12px;
`;

StyledGlobal.WrapperContent840 = styled.div`
  max-width: 840px;
  margin: auto;
`;

StyledGlobal.ContainerForm = styled.div`
  padding: 0 12px;
  width: 100%;
  margin-top: ${props => (props.margin ? '60px' : 'none')};

  @media (min-width: 576px) {
    width: ${props => (props.width ? `${props.width}px` : '500px')};
  }

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
      padding: 0;

      @media (min-width: 480px) {
        padding: 24px;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
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

  a {
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

export default StyledGlobal;
