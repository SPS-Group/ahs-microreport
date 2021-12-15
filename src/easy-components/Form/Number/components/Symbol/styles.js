import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  border: none;
`;

const enableChangeProps = css`
  color: #449dc1bb;
  background-color: transparent;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    color: #449dc1;
  }
`;

export const Content = styled.div`
  width: 40px;
  font-size: 0.9rem;
  color: #888;
  padding: 4px 8px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 500;

  ${props => props.enableChange && enableChangeProps}
`;
