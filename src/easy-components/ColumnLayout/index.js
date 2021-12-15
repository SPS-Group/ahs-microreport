/* eslint-disable react/prop-types */
import React from 'react';

import { Container, Content } from './styles';

export default function ColumnLayout({ children, hidden = false, ...rest }) {
  return (
    <Container hidden={hidden} {...rest}>
      <Content>{children}</Content>
    </Container>
  );
}
