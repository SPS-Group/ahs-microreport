import React, { useEffect, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

function Modal({ isOpened, setOpenModal, direction, children, onClose }) {
  const [open, setOpen] = useState(false);
  const [el, setEl] = useState();

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    const elCreated = document.createElement('div');
    setEl(elCreated);

    if (modalRoot) {
      modalRoot.appendChild(elCreated);
    }
    return () => {
      if (modalRoot) {
        modalRoot.removeChild(elCreated);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpened) {
      setOpen(true);
    } else {
      if (onClose) onClose();
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened]);

  return (
    <>
      {open &&
        createPortal(
          <Container
            direction={direction}
            onMouseDown={() => {
              setOpenModal(false);
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

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  setOpenModal: PropTypes.func,
  direction: PropTypes.string,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  setOpenModal: () => {},
  direction: 'left',
  onClose: () => {},
};

export default memo(Modal);
