import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;

  & > input[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  & > label {
    cursor: pointer;
    text-indent: -9999px;
    height: ${props => `${(props.size / 4) * 5.5}px`}; /* 27px; */
    width: ${props => `${(props.size / 4) * 10}px`}; /* 50px; */
    background: #aaa;
    float: right;
    border-radius: 100px;
    position: relative;
  }

  & > label::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 4px;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    background-color: white;
    border-radius: 90px;
    transition: 0.2s;
  }

  & > input:checked + label {
    background-color: #89ba89;
  }

  & > input:checked + label::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  & > label:active:after {
    width: ${props => `${props.size * 2}px`}; /* 40px; */
  }
`;
