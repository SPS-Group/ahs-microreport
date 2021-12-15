import styled from 'styled-components';

export const Container = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0 10px;
  flex: 1;
  text-align: right;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /*justify-content: center;*/

  @media (max-width: 500px) {
    text-align: left;
  }

  > div {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
`;
