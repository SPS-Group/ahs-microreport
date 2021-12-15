import styled from 'styled-components';

export const Container = styled.div`
  overflow: auto;
  display: flex;
  flex: 1;
  border-top: 2px solid #555;
  background-color: #3a3a3a;
  color: #fff;

  table {
    overflow: auto;
    display: block;
    white-space: nowrap;
    flex: 1;
  }

  td,
  th {
    text-align: left;
    border-bottom: 1px solid #555;
    border-right: 1px solid #555;
    padding: 5px;
  }
`;
