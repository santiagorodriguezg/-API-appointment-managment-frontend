import styled from 'styled-components';

const S = {};

S.ChatForm = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #f6f6f6;
  padding: 10px 5px 10px 5px;

  textarea {
    width: 100%;
    resize: none;
    overflow: hidden;
    outline: none;
    text-indent: 5px;
    box-shadow: none;
    height: 40px !important;
    max-height: 40px !important;
    margin: 0 8px;

    &:focus {
      text-indent: 5px;
      box-shadow: none;
    }
  }
`;

export default S;
