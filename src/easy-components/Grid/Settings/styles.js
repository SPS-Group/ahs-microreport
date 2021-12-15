import styled from "styled-components";

export const Container = styled.div`
  width: 200px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  border: 0;
  border-radius: 5px;
  background-color: #fff;
  overflow: auto;

  .setting-header {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #ddd;

    h1 {
      flex: 1;
      font-size: 1rem;
    }
  }

  .setting-content {
    overflow: auto;
    flex: 1;
    flex-direction: column;
  }

  .option {
    padding: 10px 15px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
    font-size: 0.8rem;
    align-content: center;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: rgba(100, 200, 255, 0.5);
    }

    .checked {
      width: 20px;
    }

    .unchecked {
      width: 20px;
    }

    .column-setting-title {
      flex: 1;
    }
  }
`;
