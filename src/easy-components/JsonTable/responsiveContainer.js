import styled, { css } from 'styled-components';

import { isMobile } from 'react-device-detect';

const mobileCss = css`
  display: flex;
  flex-direction: column;
  flex: 1;

  .ka {
    table {
      border-collapse: collapse;
    }

    /* Force table to not be like tables anymore */
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr:nth-of-type(even) {
      background: #f6f6f6;
      td {
        border-bottom: 1px solid white;
      }
    }

    tr {
      border: 1px solid #ccc;
    }

    td.ka-cell {
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
    }

    td.ka-cell:before {
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      left: 6px;
      width: 35%;
      padding-right: 10px;
      padding-left: 10px;
      white-space: nowrap;
      /* Label the data */
      content: attr(data-column);

      color: #8197a5;
      font-weight: bold;
      text-align: left;
      font-size: 0.8rem;
      font-weight: 600;
    }

    div.ka-cell-text {
      white-space: normal;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      font-size: 0.8rem;
    }
  }
`;

export const Container = styled.div`
  ${() => isMobile && mobileCss}
`;
