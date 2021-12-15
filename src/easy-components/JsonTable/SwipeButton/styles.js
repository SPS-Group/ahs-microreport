import styled, { css } from 'styled-components';

const directionRight = css`
  flex-direction: row-reverse;
  justify-content: flex-start !important;
  svg {
    margin-right: 0px;
    margin-left: 10px;
  }
`;

export const Container = styled.div`
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  color: #777;
  background-color: #f0f0f0;

  svg {
    margin-right: 10px;
    margin-left: 0px;
  }

  ${(props) => props.direction === 'right' && directionRight}
`;
