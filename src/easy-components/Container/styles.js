import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #f9f9f9;

  & > form {
    overflow: auto;
  }
`;

export const Icon = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: ${props => (props.isLoading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  svg {
    z-index: 999;
  }
`;
