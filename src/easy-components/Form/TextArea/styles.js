import styled, { css } from 'styled-components';
import { colors } from '../styles';

export const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  background-color: #fff;
  border: ${props =>
    props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`};
  padding: 8px;
  color: ${colors.fieldColor};
  resize: none;

  &:disabled {
    background-color: #ebebe4;
  }

  &:focus {
    border: 1px solid ${colors.fieldFocus} !important;
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

  ${props =>
    props.readOnly &&
    css`
      background-color: #f9f9f9;
    `}
`;
