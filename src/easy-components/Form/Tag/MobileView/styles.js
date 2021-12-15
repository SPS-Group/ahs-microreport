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
  > svg {
    margin-right: 6px;
  }
`;
