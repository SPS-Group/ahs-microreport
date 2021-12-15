import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${props =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth};
    `}
`;
