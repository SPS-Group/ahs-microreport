import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.color};

  &.vertical {
    width: 6px;
  }

  &.horizontal {
    height: 4px;
  }
`;
