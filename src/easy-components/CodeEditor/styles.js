import styled, { css } from 'styled-components';

export const Component = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .readonly {
    background-color: #3b3b3b;
  }

  ${props =>
    props.isExpanded &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 100;
    `}

  > section {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .resizable-fragment {
    display: flex;
  }
`;

export const Toolbar = styled.div`
  background-color: #3f3f3f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  height: 45px;

  > h1 {
    color: #fff;
  }

  > section {
    display: flex;
    flex-direction: row;
    align-items: center;

    > div {
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;

export const Container = styled.section`
  overflow: auto;
  background-color: #333;
  flex: 2;

  .editor {
    background-color: transparent;
    flex: 1;
    color: #fff;
    overflow: initial;

    * {
      font-family: monospace !important;
    }
  }
`;

export const SqlConsole = styled.section`
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

export const EditorContent = styled.div`
  background-color: transparent;
  display: flex;
`;
