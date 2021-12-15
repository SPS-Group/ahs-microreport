import styled from 'styled-components';

export const PageHeader = styled.div`
  position: relative;
  height: 45px;
  width: 100%;
  min-height: 44px;
  background-color: ${props => props.backgroundColor || '#fefefe'};
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.color || '#555'};
`;

export const MainMenu = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
