/* eslint-disable react/prop-types */
import React from 'react';

import { formatCell } from '../Helpers/formatCell';

import { DisplayCell } from '../styles';

function CustomCells({ value, column, rowData }) {
  const text = formatCell({ value, column, rowData });
  return <DisplayCell>{text}</DisplayCell>;
}

export default CustomCells;
