import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.5rem;

  * {
    box-sizing: border-box;
  }

  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  :focus,
  :active {
    outline: 0;
    border: 0;
  }

  .title {
    background-color: ${props => props.headerBgColor};
    color: #fff;
    padding: 5px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .actions {
      & > div {
        padding: 10px;
        border-radius: 5px;

        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.2) !important;
        }
      }
    }
  }
  .table {
    flex: 1;
    border-collapse: collapse;
    width: 100%;
    overflow-x: auto;
    display: block;
    display: flex;
    flex-direction: column;
    height: 400px;
    background-color: ${props => props.headerBgColor};

    scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: transparent;
      scrollbar-width: thin;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      /*border-radius: 5px;*/
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
  .thead,
  .tfoot {
    .row {
      display: flex;
      flex-direction: row;
      width: 100%;
      & > div {
        height: ${props => props.lineHeight}px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: center;
        padding: 0 10px;
      }
    }
  }
  .thead {
    background-color: ${props => props.headerBgColor};
    color: ${props => props.headerTextColor};
    border-bottom: 1px solid #e0e0e0;

    .row {
      background-color: ${props => props.headerBgColor} !important;
    }
  }
  .tfoot {
    background-color: #eee;
    color: #000;
  }
  .thead,
  .tfoot,
  .tbody {
    display: block;
  }
  .tbody {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-color: #4889 ${props => props.headerBgColor};
    scrollbar-width: thin;
    color: #333;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: transparent;
      scrollbar-width: thin;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: ${props => props.headerBgColor};
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #4889;
      /*border-radius: 5px;*/
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #089;
    }

    background: repeating-linear-gradient(
      #fefefe,
      #fefefe ${props => props.lineHeight}px,
      rgb(245, 245, 245) ${props => props.lineHeight}px,
      rgb(245, 245, 245) ${props => props.lineHeight + 1}px
    );

    .row {
      display: flex;
      flex-direction: row;
      width: 100%;
      border-bottom: 1px solid #ddd;
      background-color: #fff;
      & > div {
        height: ${props => props.lineHeight}px;
        /* border: dashed 1px lightblue; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* flex: 1; */
        display: flex;
        align-items: center;
      }

      :hover {
        background-color: rgba(0, 0, 0, 0.01);
      }
    }
  }
`;
