import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;

  svg {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    color: ${(props) => props.color} !important;
  }
`;
