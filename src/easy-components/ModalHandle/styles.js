import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;

  @media (max-width: 500px) {
    @keyframes showDiv {
      from {
        left: ${(props) => (props.direction === 'right' ? '500px' : '-500px')};
      }
      to {
        left: 0px;
      }
    }
    animation: showDiv 0.5s, left 0.5s;
  }

  @media (min-width: 501px) {
    @keyframes showDiv {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    animation: showDiv 0.5s;
  }
`;

export const Content = styled.div`
  overflow: auto;
  display: flex;

  @media (max-width: 500px) {
    height: 100%;
    width: 100%;
    flex-direction: column;
    flex: 1;

    aside {
      width: 100%;
    }

    form {
      height: 100%;
    }
  }
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

/*
export const Content = styled.div`
  position: relative;
  margin: auto;
  display: flex;
  height: ${props => (props.height ? props.height : 'inherit')};
  max-height: ${props => props.maxHeight};
  width: ${props => (props.width ? props.width : '')};

  @media (max-width: 500px) {
    height: 100%;
    max-height: 100%;
    width: 100%;
  }
`;

*/
