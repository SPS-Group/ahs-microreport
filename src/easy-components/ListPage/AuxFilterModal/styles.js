import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  overflow: auto;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    flex: 1;

    height: 100%;
  }
`;

export const Content = styled.div`
  background-color: #e9edef;
  overflow: auto;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    flex: 1;

    height: 100%;
  }
`;
