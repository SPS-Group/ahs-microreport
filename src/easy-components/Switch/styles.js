import styled from 'styled-components';

export const Mobile = styled.div`
  display: none;
  @media (max-width: 500px) {
    box-shadow: none;
    display: flex;

    align-items: center;
  }
`;

export const Computer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  @media (max-width: 500px) {
    box-shadow: none;
    display: none;
  }
`;
