/* eslint-disable react/prop-types */
import React from 'react';
import * as Icons from 'react-icons';

import { Container } from './styles';

function Icon({ name, size, color, ...rest }) {
  const icon = Icons[name] ? React.createElement(Icons[name]) : '';
  return (
    <Container size={size} color={color} {...rest}>
      {icon}
    </Container>
  );
}

export default Icon;
