/* eslint-disable no-case-declarations */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { closeEditor, updateCellValue } from 'ka-table/actionCreators';

import { format, getMonth, getYear } from 'date-fns';
import { Input } from '../styles';

import dateFormat from '../../Helpers/dateFormat';

function InputDate({ column, rowKeyValue, value, dispatch }) {
  const StringToDate = (stringDate) => {
    try {
      if (stringDate) {
        const dateRef = new Date();
        // eslint-disable-next-line react/destructuring-assignment
        const dateParts = stringDate.split('/');

        switch (dateParts.length) {
          case 1:
            const dateValue = dateParts[0];
            const captura = dateValue.match(/\d\d?/g);

            switch (captura.length) {
              case 1:
                return new Date(
                  getYear(dateRef),
                  getMonth(dateRef),
                  captura[0]
                );
              case 2:
                return new Date(getYear(dateRef), +captura[1] - 1, captura[0]);

              default:
                const [day, month, ...year] = captura;
                if (year.join('').length === 2) {
                  const newYear = +year + 2000;
                  return new Date(newYear, +month - 1, day);
                }
                return new Date(year.join(''), +month - 1, day);
            }

          case 2:
            return new Date(getYear(dateRef), dateParts[1] - 1, dateParts[0]);

          case 3:
            return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

          default:
            return null;
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const close = () => {
    dispatch(closeEditor(rowKeyValue, column.key));
  };

  const charPermitted = '0123456789/';

  let dateValue;

  if (value !== null) {
    if (typeof value === 'object') {
      dateValue = format(value, 'dd/MM/yyyy');
    } else dateValue = dateFormat(value, 'dd/MM/yyyy');
  }

  const [editorValue, setValue] = useState(dateValue);

  return (
    <Input
      value={editorValue}
      inputType="inputNumber"
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      onBlur={(event) => {
        const evt = event.target;

        evt.value = evt.value
          ? format(StringToDate(evt.value), 'dd/MM/yyyy')
          : null;

        setValue(evt.value);

        dispatch(updateCellValue(rowKeyValue, column.key, evt.value));
        close();
      }}
      onKeyPress={(e) => {
        if (charPermitted.indexOf(e.key) === -1) {
          e.target.value = dateFormat(value, 'dd/MM/yyyy');
        }
        if (charPermitted.indexOf(e.key) < 0) e.preventDefault();
      }}
    />
  );
}

export default InputDate;
