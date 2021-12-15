/* eslint-disable react/prop-types */
import React from 'react';
import { updateFilterRowValue } from 'ka-table/actionCreators';
import DebounceEvent from '~/easy-components/DebounceEvent';

function TextFilter({ column, dispatch, disabled = false }) {
  function onChange(event) {
    const targetValue = event.target.value;
    dispatch(updateFilterRowValue(column.key, targetValue));
  }

  return <input disabled={disabled} onChange={DebounceEvent(onChange, 1000)} />;
}

export default TextFilter;
