import styled from 'styled-components';
import modal from 'react-escape-outside';

export const Container = styled(modal)`
  background-color: #fff;

  @media (max-width: 500px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const BigTextArea = styled.textarea`
  background-color: #fff;
  width: 75vw;
  height: 75vh;
  border-radius: 2px;
  border: none;
  padding: 20px;

  @media (max-width: 500px) {
    resize: none;
    flex: 250;
  }
`;
