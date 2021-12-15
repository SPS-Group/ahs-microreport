import styled, { css } from 'styled-components';

export const Input = styled.input`
  flex: 1;
  width: 100%;
  background-color: #f9f9f9;
  border: ${props =>
    props.hideBorder ? 'none' : '1px solid rgba(50, 54, 58, 0.2)'};
  padding: 8px;
  /* font-size: 0.9rem; */
  color: ${props => (props.color ? props.color : '#444')};
  height: 40px;

  &:focus {
    border: 1px solid #9cc3d4;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    border: 0;

    &:focus {
      border: 0;
    }
  }
  /* min-height: 50px; */

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  ${props =>
    props.error &&
    css`
      border: 2px solid #992222;
    `}
`;
