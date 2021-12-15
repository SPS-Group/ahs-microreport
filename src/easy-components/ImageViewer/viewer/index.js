/* eslint-disable react/prop-types */
import React from 'react';

import { Container } from './styles';
import Button from '../../Button';

function viewer({ onClose, imageUrl }) {
  return (
    <Container>
      <img src={imageUrl} alt="" />
      <Button onClick={onClose}>Fechar</Button>
    </Container>
  );
}

export default viewer;
