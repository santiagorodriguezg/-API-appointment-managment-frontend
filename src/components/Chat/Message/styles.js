import styled, { css } from 'styled-components';

const S = {};

S.Message = styled.div`
  width: 100%;
  max-width: 60%;
  position: relative;
  margin-bottom: 12px;
  border-radius: 10px;
  padding: 4px 10px 7px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  word-wrap: break-word;
  float: right;
  background: #dcf8c6;

  &:before {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
    border: 0.6em solid transparent; /* arrow size */
    border-left-color: #dcf8c6; /* arrow color */
    right: -16px;
    bottom: 5px;
  }

  ${props =>
    props.receiver &&
    css`
      float: left;
      background: #ececec;

      &:before {
        border: 0.6em solid transparent; /* arrow size */
        border-right-color: #ececec; /* arrow color */
        left: -16px;
        top: 5px;
      }
    `};
`;

S.MessageText = styled.div`
  margin: 0;
  padding: 5px;
  word-wrap: break-word;
  font-size: 14px;
  padding-bottom: 0 !important;
`;

S.MessageTime = styled.div`
  margin: 0;
  margin-left: 50px !important;
  font-size: 12px;
  text-align: right;
  color: rgba(0, 0, 0, 0.55);
`;

export default S;
