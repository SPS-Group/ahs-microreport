import styled from "styled-components";

export const Container = styled.select`
  border: 0;
  padding: 0 10px;
  position: relative;

  :focus,
  :active {
    outline: 0;
    border: 0;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";

  height: 100%;
  background-color: transparent;
  outline: none;

  option {
    color: #333;
    font-size: 0.8rem;

    &:focus {
      background-color: #fff;
    }
  }

  &:focus {
    background-color: rgba(100, 200, 255, 0.4) !important;
    -webkit-appearance: menulist-button;
    -moz-appearance: menulist-button;
    text-indent: 0px;
    text-overflow: visible;
  }

  .element {
    padding: 10px;
  }
`;
