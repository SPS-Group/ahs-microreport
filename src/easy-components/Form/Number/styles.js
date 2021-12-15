import styled, { css } from 'styled-components';
import { colors, sizes } from '../styles';

export const Input = styled.input`
  flex: 1;
  width: 100%;
  background-color: #fff;

  padding: 8px;
  color: ${colors.fieldColor};
  border-radius: ${sizes.borderRadius};
  /* border-top-left-radius: ${sizes.borderRadius};
  border-bottom-left-radius: ${sizes.borderRadius}; */
  border: none !important;

  &:disabled {
    background-color: #ebebe4;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  ${props =>
    props.readOnly &&
    css`
      background-color: #f5f5f5;
    `}

  @media (max-width: 500px) {
    background-color: transparent !important ;
    border: none !important;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: ${sizes.borderRadius};
  border: ${props =>
    props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`};

  @media (max-width: 500px) {
    background-color: transparent !important ;
    border: none !important;
  }

  /*&:focus-within {
    border: 1px solid ${colors.fieldFocus};
  }*/

  ${props =>
    props.readOnly &&
    css`
      background-color: #f5f5f5;
    `}

  ${props =>
    props.error &&
    css`
      border: 1px solid #992222;
    `}
`;
