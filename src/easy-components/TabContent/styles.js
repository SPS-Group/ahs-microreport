import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { colors } from '../styles';

export const Container = styled.div`
  flex: 1;
  flex-direction: ${props =>
    props.headerPosition === 'left' ? 'row' : 'column'};
  display: flex;
  overflow: auto;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

export const Header = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: ${props =>
    props.headerPosition === 'left' ? 'column' : 'row'};
  color: ${colors.fontColor};
  overflow: hidden;
  border-right: ${props =>
    props.headerPosition === 'left' ? '1px solid #f0f0f0' : '0px'};

  width: ${props => (props.headerPosition === 'left' ? '110px;' : 'auto')};

  &:hover {
    overflow: auto;
  }

  span {
    font-size: 0.9rem;
  }

  > div:last-child {
    margin-right: 0px;
  }

  /* > div:first-child {
    padding-left: 40px;
  } */

  @media (max-width: 500px) {
    padding: 0px;
    > div:first-child {
      padding-left: 20px;
    }
  }
`;

export const Tab = styled.div`
  padding: 10px 15px;

  border-bottom-width: 3px;
  border-bottom-style: solid;
  border-bottom-color: ${props =>
    props.selected ? props.selectedColor : props.tabColor};

  transition-property: border-bottom-color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  border-bottom-width: ${props =>
    props.headerPosition === 'left' ? '0px' : '3px'};

  padding: ${props =>
    props.headerPosition === 'left' ? '20px 30px' : '10px 15px'};

  display: ${props => (props.hidden ? 'hidden' : 'flex')};

  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 95px;

  cursor: pointer;

  @media (max-width: 500px) {
    flex: 1;
    min-width: 0px;
    margin: 0;

    border-bottom-width: 0;
    border-top-width: none;
    border-top-style: solid;
    border-top-color: ${props =>
      props.selected ? props.selectedColor : props.tabColor};

    svg {
      width: 32px;
      height: 32px;
    }

    ${props =>
      props.phantom &&
      css`
        display: none;
      `}
  }

  svg {
    margin-bottom: 5px;
    /* margin-right: 5px;
    margin-left: -5px; */

    color: ${props =>
      props.selected
        ? props.selectedColor
        : lighten(0.55, props.selectedColor)};

    @media (max-width: 500px) {
      margin-left: 5px;
      flex: 1;
    }
  }

  span {
    cursor: default;
    text-align: center;

    @media (max-width: 500px) {
      display: none;
    }
  }

  /* :hover {
    border-bottom-color: ${props => lighten(0.4, props.selectedColor)};
  } */
`;
