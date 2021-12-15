import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #dedede;
  flex: 1;
  display: flex;
  flex-direction: column;

  > section {
    flex: 1;
    display: flex;
    flex-direction: column;
    > div {
      flex: 1;
      justify-content: center;
      align-items: center;
      display: flex;
    }
    > p {
      flex: 1;
    }
  }
`;

export const FileInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;

  > div {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    height: 40px;
    padding: 0 10px;

    h1 {
      font-weight: normal;
      color: #333;
      margin: 0 40px 0 5px;
    }

    button {
      border: none;
      background-color: transparent;
    }
  }
`;
