import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #555;
  font-size: 0.9rem;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999999999;

  @keyframes gira {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: gira 8s linear infinite;
  }
`;
