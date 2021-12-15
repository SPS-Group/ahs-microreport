import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  overflow: hidden;
  flex: 1;
  height: 100%;
  padding: 0 10px;

  & > span {
    background-color: transparent;
    padding: 5px 0px 5px 10px;
    margin-right: -3px;
    margin-top: 2px;
  }
  & > svg {
    margin-top: 14px;
    margin-right: -25px;
    transition: margin-right 0.1s linear 0.2s;
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0 10px;
    background-color: transparent;
    &:focus {
      background-color: transparent !important;
    }
  }

  &:focus-within {
    background-color: rgba(100, 200, 255, 0.4) !important;
    svg {
      margin-right: 0px;
    }
  }
`;
