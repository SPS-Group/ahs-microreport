import styled from "styled-components";

export const Container = styled.div`
  display: ${props => (props.isShow ? "flex" : "none")};
  height: 45px;
  padding: 0 20px;
  background-color: #992222;
  color: #fff;
  flex-direction: row;
  align-items: center;
`;
