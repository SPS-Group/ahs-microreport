/* eslint-disable react/prop-types */
import React from 'react';
import Loading from '~/easy-components/Loading';

import { Container } from './styles';

function Card({ children, isLoading }) {
  return (
    <Container>
      <Loading isLoading={isLoading} />
      {children}
    </Container>
  );
}

export default Card;
