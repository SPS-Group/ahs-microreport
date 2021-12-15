import styled from 'styled-components';

export const Container = styled.aside`
  background-color: #e9edef;
  overflow-y: auto;
  min-height: 0;
  height: 100%;
  flex: 1;
  /*visibility: hidden;*/
  display: ${props => (props.visible ? 'flex' : 'none')};
  animation: fadeInFromNone 0.5s ease-out;

  @-webkit-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @-o-keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @keyframes fadeInFromNone {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }
`;
