import styled from 'styled-components';

export const Container = styled.div`
  background-color: #e3e8ea;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${props => (props.isModal ? '70vw' : '100%')};

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const TableBox = styled.table`
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  width: 100%;

  & tr {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0 0.35em;
  }

  & th {
    font-weight: 500;
  }

  & th,
  td {
    color: #555;
    padding: 0.625em;
    text-align: center;
  }

  @media screen and (max-width: 500px) {
    & thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    & tr {
      display: block;
      margin: 0.625em;
      border-radius: 4px;
    }
    & td {
      border-bottom: 1px solid #ddd;
      display: block;
      text-align: right;
    }

    & td:last-child {
      border-bottom: none;
    }

    & td::before {
      font-weight: 500;
      content: attr(data-label);
      float: left;
    }
  }
`;
