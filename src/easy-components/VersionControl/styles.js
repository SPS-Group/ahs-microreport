import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  flex-direction: column;
  padding: 50px;

  h1 {
    font-weight: normal;
    font-size: 1.2rem;
    color: #555;
  }

  h2 {
    margin-top: 20px;
    font-size: 1.4rem;
    font-weight: normal;
  }
`;

export const LoadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  margin-left: 5px;

  @keyframes gira {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: gira 1s linear infinite;
  }
`;
