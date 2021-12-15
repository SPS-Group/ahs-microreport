/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';

import { closeEditor, updateCellValue } from 'ka-table/actionCreators';

import { Input } from '../styles';

import { PageContext } from '../index';

function InputText({ column, rowKeyValue, value }) {
  const { dispatch } = useContext(PageContext);

  const close = () => {
    dispatch(closeEditor(rowKeyValue, column.key));
  };
  const [editorValue, setValue] = useState(value);

  return (
    <Input
      value={editorValue}
      onChange={(event) => setValue(event.currentTarget.value || '')}
      onBlur={() => {
        dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
        close();
      }}
    />
  );
}

export default InputText;
