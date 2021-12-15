/* eslint-disable react/prop-types */
import React from 'react';
import AuxInfo from '~/easy-components/AuxInfo';
import { Container } from './styles';

export default function Item({ data, propFieldLabel }) {
  return (
    <Container>
      <div>{data[propFieldLabel]}</div>
      <AuxInfo text={data.auxInfo || data.AuxInfo} />
    </Container>
  );
}
