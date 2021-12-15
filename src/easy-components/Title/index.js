/* eslint-disable react/prop-types */
import React from 'react';

import { Container } from './styles';

export default function Title({ children }) {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  );
}
