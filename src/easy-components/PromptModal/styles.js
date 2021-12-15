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
  flex-direction: column;

  background-color: #f0f0f0;

  @media (max-width: 500px) {
    padding: 0px;

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

export const ModalBody = styled.div`
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  flex: 1;

  span {
    margin-bottom: ${(props) => (props.type === 'question' ? '25px' : 0)};
    color: #888;
  }

  @media (max-width: 500px) {
    padding: 20px;
  }
`;

export const TextBox = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  border-radius: 2px;
  width: 100%;
  min-height: 150px;

  border: none;
  resize: none;
  background-color: #fff;

  @media (max-width: 500px) {
    flex: 1;
  }
`;
