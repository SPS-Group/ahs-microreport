import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 5px;
  background-color: #fff;
  overflow: auto;

  .setting-header {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #ddd;

    h1 {
      flex: 1;
      font-size: 1rem;
    }
  }
  .search {
    padding: 20px;
    input {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      flex: 1;
    }
  }
`;

export const Line = styled.div`
  background-color: ${props =>
    props.selected ? "rgba(100, 200, 255, 0.4) !important" : ""};
`;
