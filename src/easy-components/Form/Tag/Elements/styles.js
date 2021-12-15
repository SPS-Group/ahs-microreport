import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 35px;
  padding: 5px 5px 0px 5px;
  font-size: 0.9rem;
  background-color: ${props => (props.readOnly ? '#f5f5f5' : '#fff')};
`;
