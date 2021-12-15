import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  /* padding: 10px; */

  @media (max-width: 500px) {
    padding: 0%;
  }
`;
