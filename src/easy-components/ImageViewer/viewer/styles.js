import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  flex: 1;

  img {
    border-radius: 5px;
    flex: 1;
    width: 100%;
    object-fit: contain;
  }

  button {
    margin-top: 30px;
    height: 30px;
  }
`;
