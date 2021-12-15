/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import { createPortal } from 'react-dom';

import { Container, Content, ModalBody, TextBox } from './styles';

import Button from '~/easy-components/Button';

import PageHeader from '~/easy-components/PageHeader';
import ModalFooter from '~/easy-components/ModalFooter';

// eslint-disable-next-line react/function-component-definition
const PromptModal = ({ direction }, ref) => {
  const [state, setState] = useState({
    open: false,
    title: '',
    message: '',
    type: 'textarea',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const textRef = useRef(null);

  const modalRoot = document.getElementById('modal');
  const el = document.createElement('div');

  function handleClose() {
    setState({
      ...state,
      open: false,
    });
  }

  useImperativeHandle(ref, () => ({
    show: async ({ type, title, message, onConfirm, onCancel }) => {
      setState({
        type,
        open: true,
        title,
        message,
        onConfirm,
        onCancel,
      });
    },
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

  function getComponentType() {
    switch (state.type) {
      case 'textarea':
        return (
          <>
            <span>{state.message}</span>
            <TextBox ref={textRef} />
          </>
        );

      case 'question':
        return <span>{state.message}</span>;

      default:
        return <div />;
    }
  }

  return (
    <div>
      {state.open &&
        createPortal(
          <Container direction={direction} onMouseDown={() => handleClose()}>
            <Content
              onMouseDown={(e) => {
                e.stopPropagation();
                // não incluir o e.preventDefault(); que os inputs param de funcionar
              }}
            >
              <PageHeader>{state.title}</PageHeader>
              <ModalBody type={state.type}>{getComponentType()}</ModalBody>

              <ModalFooter>
                <Button
                  buttonType="Emphasized"
                  onClick={() => {
                    // O Close deve ser fechado antes de qualquer ação
                    handleClose();
                    if (state.type === 'textarea')
                      state.onConfirm({ message: textRef.current.value });
                    else state.onConfirm({ message: '' });
                  }}
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => {
                    // O Close deve ser fechado antes de qualquer ação
                    handleClose();

                    if (state.onCancel) state.onCancel();
                  }}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Content>
          </Container>,
          el
        )}
    </div>
  );
};

export default memo(forwardRef(PromptModal));
