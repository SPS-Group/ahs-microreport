/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';

import Icon from '~/easy-components/Icon';
import { Cell } from '../styles';

export default function SelectionCell({ value, ...rest }) {
  return (
    <>
      {value !== 'H' && (
        <Cell align="center">
          <Icon
            name={rest.isSelectedRow ? 'FiCheckSquare' : 'FiSquare'}
            size={rest.isSelectedRow ? 20 : 20}
            color="#999"
            {...rest}
          />
        </Cell>
      )}
    </>
  );
}
