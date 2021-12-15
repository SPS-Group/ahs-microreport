import styled, { css } from 'styled-components';

export const Container = styled.div`
  flex: 1;
  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  flex: 1;
  padding: ${props => (props.padding ? props.padding : '10px 20px')};

  @media (max-width: 500px) {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0;
  }
`;
