import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  background-color: #f5f5f5;
  border-top: 1px solid #f7f7f7;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 0 15px;
  border-top: 1px solid #ddd;

  & > button {
    margin: 8px 0;
    margin-left: 10px;
  }
`;
