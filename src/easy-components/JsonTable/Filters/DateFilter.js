/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import React from 'react';
import { updateFilterRowValue } from 'ka-table/actionCreators';
import { getMonth, getYear, format } from 'date-fns';
import DebounceEvent from '~/easy-components/DebounceEvent';

function DateFilter({ column, dispatch }) {
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

  function onChange(event) {
    const targetValue = event.target.value;
    const date = StringToDate(targetValue);

    dispatch(updateFilterRowValue(column.key, date));
  }

  async function onBlur(event) {
    const input = event.target;
    try {
      input.value = input.value
        ? format(StringToDate(input.value), 'dd/MM/yyyy')
        : null;

      const val = input.value;

      const dateToValid = StringToDate(val);

      input.value = getYear(dateToValid) > 9999 ? null : val;
    } catch (e) {
      input.value = '';
    }
  }

  return <input onChange={DebounceEvent(onChange, 1000)} onBlur={onBlur} />;
}

export default DateFilter;
