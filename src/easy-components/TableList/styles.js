import styled from 'styled-components';

import { colors } from '../styles';

export const Container = styled.div`
  color: ${colors.fontColor};
  background-color: #fff;

  flex: 1;

  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: fixed;
  }

  table caption {
    /*
    font-size: 1.5em;*/
    margin: 0.5em 0 0.75em;
  }

  table tr {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 0.35em;
  }

  table th,
  table td {
    padding: 0.625em;
    text-align: center;
  }

  table th {
    /*font-size: 0.85em;*/
  }

  @media screen and (max-width: 500px) {
    table {
      border: 0;
    }

    table caption {
      /*font-size: 1.3em;*/
    }

    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    table td {
      border-bottom: 1px solid #ddd;

      /*

      font-size: 0.8em; */
      width: 100% !important;
      text-align: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    table td::before {
      /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
      content: attr(data-label);
      float: left;
      font-weight: 600;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
`;
