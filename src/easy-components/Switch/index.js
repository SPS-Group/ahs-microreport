/* eslint-disable react/prop-types */
import React from 'react';
import { isMobile } from 'react-device-detect';

import { Mobile, Computer } from './styles';

export default function Switch({ mobile, computer }) {
  return (
    <>
      {isMobile ? <Mobile>{mobile}</Mobile> : <Computer>{computer}</Computer>}
    </>
  );
}
