import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  /* height: ${props => props.height};
  max-width: ${props => props.width}; */
  background-color: #f0f0f0;
  margin: auto;
  overflow: auto;
  /* border-radius: 10px; */

  @media (max-width: 500px) {
    max-height: 100%;
    max-width: 100%;
    background-color: #fafafa;
    border: none;
    border-radius: 0;
    flex: 1;
  }
`;
