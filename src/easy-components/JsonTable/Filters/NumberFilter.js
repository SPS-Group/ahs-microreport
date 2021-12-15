/* eslint-disable react/prop-types */
import React from 'react';
import { updateFilterRowValue } from 'ka-table/actionCreators';
import DebounceEvent from '~/easy-components/DebounceEvent';

function NubmerFilter({ column, dispatch }) {
  const charPermitted = '0123456789.,';

  function onChange(event) {
    const targetValue = event.target.value;
    dispatch(updateFilterRowValue(column.key, targetValue));
  }

  /*
  function formatNumber(amount, decimalCount, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount);
      // eslint-disable-next-line no-restricted-globals
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      // eslint-disable-next-line radix
      const i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();

      const j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : '')
      );
    } catch (e) {
      return 0;
    }
  } */

  return (
    <input
      onChange={DebounceEvent(onChange, 1000)}
      onKeyPress={(e) => {
        if (charPermitted.indexOf(e.key) < 0) {
          e.preventDefault();
        }
      }}
    />
  );
}

export default NubmerFilter;
