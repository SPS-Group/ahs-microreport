import styled, { css } from 'styled-components';

import { isMobile } from 'react-device-detect';

export const SearchMobileInput = styled.input`
  height: 45px;
  background-color: #fff;
  border: 0;
  border-top: 2px solid #f0f0f0;
  padding: 0 15px;

  &::placeholder {
    color: #aaa;
  }
`;

export const Resume = styled.div`
  background-color: #f1f5f7;
  padding: 5px 10px;
  border-top: 1px solid #f0f0f0;
  font-size: 0.9rem;
  color: #728591;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
  background-color: #fff;

  width: 100%;
  height: 100%;

  .csv-link {
    background-color: #353c44;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex: 1;

  overflow: auto;
  .ka {
    width: 100%;
  }

  .ka-cell {
  }

  .ka-cell-text {
    justify-content: flex-start !important;
    text-align: left;

    > div {
      justify-content: flex-start !important;
      text-align: left;
      line-height: 18px;
    }
  }

  > div {
    width: 100%;
    height: 100%;
    ${() =>
      !isMobile &&
      css`
        display: flex;
      `};
  }

  table {
    width: 100%;
    display: block;
    white-space: nowrap;
    flex: 1;
    width: 100%;
  }

  thead {
    width: 100%;
  }

  td,
  th {
    /* width: 100%; */
    text-align: left;
    padding: 8px 20px;
    line-height: 29px;
    color: #353c44;
  }

  th {
  }

  input {
    width: 100%;
    padding: 8px;

    border-radius: 0;
    border: 1px solid #f0f0f0;
  }

  .ka-table {
    tbody {
      tr {
        transition: background 0.2s;
        border: none;
        border-bottom: 1px solid #f0f0f0 !important;
      }

      tr:hover {
        background: #e9e9e9 !important;
      }

      tr:nth-child(even) {
        background: #f7f7f7;
      }

      tr:first-child,
      tr:last-child {
        padding: 0 !important;

        th,
        td {
          padding: 0 !important;
        }
      }
    }
  }

  .ka-input {
  }

  .ka-filter-row-cell {
    padding: 0;
    background-color: #f7f7f7;

    input {
      background-color: #fff;
    }
  }

  .ka-row-selected {
    background-color: #deeff6 !important;
  }
`;

export const Toolbar = styled.div`
  background-color: #fff;
  color: #353c44;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  height: 50px;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;

  button {
    border: none;
    background-color: transparent;
    margin-right: 10px;
  }
`;

export const FooterBar = styled.div`
  background-color: #fff;
  color: #353c44;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
  height: 50px;
  border-top: 1px solid #dedede;

  button {
    margin-right: 10px;
  }
`;

export const Linker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd !important;
  background-color: #fff;

  text-align: ${(props) =>
    props.inputType === 'inputNumber' ? 'right' : 'left'};
`;

export const DisplayCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const ActionContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  color: #eee;
  user-select: none;
`;

export const Cell = styled.div`
  justify-content: ${(props) => (isMobile ? 'flex-start' : props.align)};

  > div {
    justify-content: ${(props) => (isMobile ? 'flex-start' : props.align)};
  }
`;

export const AppendButton = styled.div`
  margin-left: 0.3rem;
  cursor: pointer;
`;
