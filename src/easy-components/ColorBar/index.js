import React from 'react';

import { Container } from './styles';

function ColorBar({ type, color }) {
  return <Container color={color || '#DDD'} className={type} />;
}

export default ColorBar;
