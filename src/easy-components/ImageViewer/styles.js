import styled from 'styled-components';

export const Container = styled.button`
  border: 0;
  border-radius: 5px;
  align-self: center;
  margin: 5px;

  width: ${props => props.width};
  height: ${props => props.height};

  > img {
    border-radius: 5px;
    width: ${props => props.width};
    height: ${props => props.height};
  }
`;
