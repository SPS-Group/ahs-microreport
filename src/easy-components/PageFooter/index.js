/* eslint-disable react/prop-types */
import React from 'react';

import { Container } from './styles';

export default function PageFotter({ children, ...rest }) {
  return <Container {...rest}>{children}</Container>;
}
