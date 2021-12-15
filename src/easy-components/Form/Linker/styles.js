import styled, { css } from 'styled-components';
import { colors, sizes, Input as InputBase } from '../styles';

export const PanelInput = styled.div`
  position: relative;
  flex: 1;
  border-radius: ${sizes.borderRadius};

  > div {
    flex: 1;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-radius: ${sizes.borderRadius};

    border: ${props =>
      props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`} !important;

    svg {
      margin: 5px;
    }

    input {
      border: none !important;
    }

    &:focus-within {
      border: 1px solid ${colors.fieldFocus} !important;

      input {
        border: none !important;
      }
    }

    /* ${props =>
      props.readOnly &&
      !props.hideBorder &&
      css`
        border: 1px solid ${colors.fieldBorder} !important;
      `} */
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  margin-left: 5px;
  cursor: pointer;
`;

export const LoadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  margin-left: 5px;

  @keyframes gira {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    animation: gira 1s linear infinite;
  }
`;

export const Input = styled(InputBase)`
  border: none !important;
  &:focus {
    border: none !important;
  }
`;
