import styled from "styled-components";

export const Container = styled.div`
  table {
    border-collapse: collapse; /* make simple 1px lines borders if border defined */
  }

  tbody {
    tr {
      background-color: #fafafa;
      &:nth-child(even) {
        background-color: #fff;
      }
    }
  }

  .outer-container {
    background-color: #f9f9f9;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .inner-container {
    height: 100%;
    overflow: hidden;
  }

  .table-header {
    height: 40px;
    position: relative;

    th {
      padding: 5px;
    }
  }

  .table-body {
    height: calc(100% - 40px);
    overflow: auto;

    tr {
      height: 30px;
    }
  }

  .header-cell {
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
    text-align: left;
    height: 40px;
  }

  .body-cell {
    text-align: left;
  }

  .col {
    width: 150px;
    min-width: 150px;
  }
`;

export const Body = styled.div``;
