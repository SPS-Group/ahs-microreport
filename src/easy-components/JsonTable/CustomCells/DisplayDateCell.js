/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React from 'react';

import dateFormat from '../../Helpers/dateFormat';

import { DisplayCell, Cell } from '../styles';

export function formatDate(date, format = 'dd/MM/yyyy') {
  return dateFormat(date, format);
}

function CustomCells({ value, isModal }) {
  return (
    <Cell align="center">
      <DisplayCell
        style={{
          justifyContent: isModal ? 'flex-start' : 'center',
        }}
      >
        {formatDate(value, 'dd/MM/yyyy')}
      </DisplayCell>
    </Cell>
  );
}

export default CustomCells;
