import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';
import { colors, sizes } from '../styles';

export const Input = styled(InputMask)`
  flex: 1;
  width: 100%;
  background-color: #fff;
  border: ${props =>
    props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`};

  padding: 8px;
  color: ${colors.fieldColor};
  border-radius: ${sizes.borderRadius};

  &:disabled {
    background-color: #ebebe4;
  }

  &:focus {
    border: 1px solid ${colors.fieldFocus};
  }

  @media (max-width: 500px) {
    border: 0;

    &:focus {
      border: 0 !important;
    }
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  ${props =>
    props.error &&
    css`
      border: 1px solid #992222;
    `}

  ${props =>
    props.readOnly &&
    css`
      background-color: #f5f5f5;
    `}
`;
