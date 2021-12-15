import styled from 'styled-components';

export const Container = styled.button`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;

  > div {
    padding: 4px 8px;
    text-align: left;
    flex: 1;
  }
`;

export const Text = styled.div`
  flex: 1;
  background-color: ${props => (props.readOnly ? '#f9f9f9' : '#fff')};
  border: none;
  padding: 8px;
  color: #444;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;
