/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '../../Modal';

import Detail from './Detail';
import { Container } from './styles';

function ErrorInformation({ errors }) {
  const [isOpen, setIsOpen] = useState(false);

  const errorCount = errors ? Object.keys(errors).length : 0;

  function onShowErrors() {
    setIsOpen(true);
  }

  return (
    <>
      {errorCount > 0 && (
        <Container onClick={() => onShowErrors()}>
          Verifique os erros e tente novamente. Clique aqui para visualizar
          todos os erros.
        </Container>
      )}
      <Modal isOpened={isOpen}>
        <Detail errors={errors} onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default ErrorInformation;
