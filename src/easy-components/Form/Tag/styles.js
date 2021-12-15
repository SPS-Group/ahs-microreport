import styled, { css } from 'styled-components';
import { colors, sizes } from '../styles';

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
      margin-bottom: 10px;
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
  align-items: flex-end;
  justify-content: center;
  padding-right: 4px;
  margin-left: 5px;
  cursor: pointer;
`;
