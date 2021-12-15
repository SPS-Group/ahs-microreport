import styled, { css } from 'styled-components';
import { colors } from '../styles';

export const Container = styled.div`
  align-items: center;
  flex-direction: row;

  ${props =>
    !props.disableRenderMobile &&
    css`
      @media (max-width: 500px) {
        padding: 20px;
        flex-direction: row-reverse;
      }
    `}

  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

export const Input = styled.input`
  background-color: #fff;
  border: ${props =>
    props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`};
  padding: 8px;
  color: ${colors.fieldColor};
  border-radius: 5px;
  height: 20px !important;
  width: 20px !important;
  margin-right: 10px;

  &:disabled {
    background-color: #ebebe4;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
    border: 0;

    &:focus {
      border: 0 !important;
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
