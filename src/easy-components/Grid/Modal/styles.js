import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: ${props => (props.isOpened ? "flex" : "none")};
`;

export const Background = styled.div`
  @keyframes showDiv {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: showDiv 1s;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  -webkit-backdrop-filter: blur(2px);
  -moz-backdrop-filter: blur(2px);
  -o-backdrop-filter: blur(2px);
  -ms-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);

  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.div`
  position: relative;
  margin: auto;
`;
