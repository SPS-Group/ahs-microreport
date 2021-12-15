/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import Button from '~/easy-components/Button';
import ModalHandle from '~/easy-components/ModalHandle';

import { Container, Line, Header, Body, Footer, GroupPanel } from './styles';

function GroupBy({ options, onSelect, onClear, title }, ref) {
  const modalRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current.handleOpen();
    },
    close: () => {
      modalRef.current.handleClose();
    },
  }));

  return (
    <>
      <GroupPanel>
        <span>Agrupar por: </span>
        <Button
          buttonType="Default"
          style={{ borderWidth: '1px', borderStyle: 'solid' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            modalRef.current.handleOpen();
          }}
        >
          {title || 'Sem Agrupamento'}
        </Button>
      </GroupPanel>
      <ModalHandle ref={modalRef} direction="right">
        <Container>
          <Header>Agrupar por</Header>
          <Body>
            {options.map((option) => (
              <Line
                key={option.value}
                onClick={() => {
                  modalRef.current.handleClose();
                  onSelect(option);
                }}
              >
                {option.label}
              </Line>
            ))}
          </Body>
          <Footer>
            <Button
              onClick={() => {
                modalRef.current.handleClose();
                onClear();
              }}
            >
              Remover
            </Button>
            <Button onClick={() => modalRef.current.handleClose()}>
              Fechar
            </Button>
          </Footer>
        </Container>
      </ModalHandle>
    </>
  );
}

export default forwardRef(GroupBy);
