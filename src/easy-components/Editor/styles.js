import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;

  span {
    font-family: 'FiraCode';
  }

  .mtkz {
    width: 8px !important;
  }

  section {
    padding: 10px 0 0 0;
  }
`;

export const TBar = styled.div`
  height: 45px;
  background-color: #2b2b2b;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
