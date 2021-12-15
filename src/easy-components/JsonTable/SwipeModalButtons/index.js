/* eslint-disable react/prop-types */
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';

import ModalHandle from '../../ModalHandle';
import Button from '~/easy-components/Button';

import { Container, Header, Body, Footer } from './styles';

function SwipeModalButtons(props, ref) {
  const modalRef = useRef();

  const [state, setState] = useState({
    buttons: [],
  });

  useImperativeHandle(ref, () => ({
    open: ({ buttons }) => {
      setState({
        ...state,
        buttons,
      });
      modalRef.current.handleOpen();
    },
    close: () => {
      modalRef.current.handleClose();
    },
  }));

  // const buttons = onGetButtons();
  return (
    <ModalHandle ref={modalRef} direction="right">
      <Container>
        <Header>Menu</Header>
        <Body>
          {state.buttons && state.buttons.map((button) => button.content)}
        </Body>
        <Footer>
          <Button
            onClick={() => {
              modalRef.current.handleClose();
            }}
          >
            Fechar
          </Button>
        </Footer>
      </Container>
    </ModalHandle>
  );
}

export default forwardRef(SwipeModalButtons);
