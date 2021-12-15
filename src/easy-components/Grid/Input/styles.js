import styled from "styled-components";

export const Container = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  padding: 10px;
  color: #333;
  background-color: transparent;

  &:focus {
    background-color: rgba(100, 200, 255, 0.4) !important;
  }
`;
