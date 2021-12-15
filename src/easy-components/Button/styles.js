import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { colors } from '../styles';

export const Container = styled.button`
  background-color: transparent;
  border: 1px solid;
  padding: 8px;
  border-radius: 5px;
  transition: background 0.3s, width 0.5s;

  &:disabled {
    border: 0;
    background-color: #ddd !important;
    color: #fff !important;
  }

  /* &:focus {
    border: 1px solid #00bfff !important;
  } */

  &.Emphasized {
    border-color: ${colors.main};
    background-color: ${colors.main};
    color: #fff;

    &:hover {
      background-color: ${darken(0.05, colors.main)};
    }
  }

  &.Default {
    border-color: ${colors.main};
    color: ${colors.main};

    &:hover {
      background-color: ${lighten(0.63, colors.main)};
    }
  }

  &.Accept {
    border-color: #107e3e;
    color: #107e3e;

    &:hover {
      background-color: ${lighten(0.65, '#107e3e')};
    }
  }

  &.Reject {
    border-color: ${colors.red};
    color: ${colors.red};
    &:hover {
      border-color: ${darken(0.2, colors.red)};
      color: ${darken(0.2, colors.red)};
    }
  }
`;
