import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;

  &:focus-within {
    background-color: rgba(100, 200, 255, 0.4) !important;
  }
`;
