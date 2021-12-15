import styled from 'styled-components';
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
    }

    input {
      border: none !important;
      color: #999;
    }

    &:focus-within {
      border: 1px solid ${colors.fieldFocus} !important;

      input {
        border: none !important;
      }
    }
    /* background-color: blue; */

    @media (max-width: 500px) {
      background-color: transparent;
      border: none !important;

      input {
        color: #555;
        font-size: 0.9rem;
      }

      &:focus-within {
        border: none !important;

        input {
          border: none !important;
        }
      }
    }
  }
`;

export const IconsContainer = styled.div`
  display: flex;
`;

export const IconPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1px;
  cursor: pointer;
  background-color: #fff;
  &:last-child {
    padding-right: 4px;
  }

  @media (max-width: 500px) {
    background-color: transparent;
    &:last-child {
      padding-right: 2px;
    }
  }
`;
