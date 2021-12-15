import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 30px;
  flex: 1;

  & > button {
    margin: 8px 0;
    margin-left: 10px;
  }
`;
