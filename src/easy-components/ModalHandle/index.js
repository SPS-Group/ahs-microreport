/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { createPortal } from 'react-dom';

import { Container, Content } from './styles';

function ModalHandle({ direction = 'left', children }, ref) {
  const [open, setOpen] = useState(false);
  const modalRoot = document.getElementById('modal');
  const el = document.createElement('div');

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useImperativeHandle(ref, () => ({
    isOpenModal: open,
    handleOpen,
    handleClose,
  }));

  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(el);
      return () => {
        modalRoot.removeChild(el);
      };
    }

    return () => {};
  }, [el, modalRoot]);

  return (
    <>
      {open &&
        createPortal(
          <Container
            direction={direction}
            onMouseDown={() => {
              handleClose();
            }}
          >
            <Content
              onMouseDown={(e) => {
                e.stopPropagation();
                // não incluir o e.preventDefault(); que os inputs param de funcioar
              }}
            >
              {children}
            </Content>
          </Container>,
          el
        )}
    </>
  );
}

export default forwardRef(ModalHandle);
