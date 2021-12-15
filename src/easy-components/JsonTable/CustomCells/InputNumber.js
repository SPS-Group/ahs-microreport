/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { closeEditor, updateCellValue } from 'ka-table/actionCreators';

import { Input } from '../styles';

import {
  formatToNumberDecimal,
  formatToStringDecimal,
} from '~/easy-components/Helpers';

import dynamicFunction from '../dynamicFunction';
import validateAndSelectRow from '../CustomActions/validateAndSelectRow';

const charPermitted = '0123456789,.';

function InputNumber({
  column,
  rowKeyValue,
  value,
  dispatch,
  rowData,
  onRefresh,
  style,
  cellProps,
}) {
  // const { dispatch } = useContext(PageContext);

  const close = () => {
    dispatch(closeEditor(rowKeyValue, column.key));
  };

  const stringValue = formatToStringDecimal(value, 2, ',', '.');

  const [editorValue, setValue] = useState(stringValue);

  useEffect(() => {
    setValue(stringValue);
  }, [stringValue]);

  return (
    <Input
      style={style}
      value={editorValue}
      inputType="inputNumber"
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      onBlur={async () => {
        const numberValue = formatToNumberDecimal(editorValue, 2);

        dispatch(updateCellValue(rowKeyValue, column.key, numberValue));
        close();

        if (column.settings && column.settings.onChange) {
          await dynamicFunction({
            functionString: column.settings.onChange,
            dispatch,
            params: {
              column,
              line: rowData,
              value,
              rowKeyValue,
              refresh: onRefresh,
              currentValue: numberValue,
              setFieldValue: (columnKey, newValue) => {
                dispatch(updateCellValue(rowKeyValue, columnKey, newValue));
                dispatch(closeEditor(rowKeyValue, columnKey));
              },
              selectRow: ({ force = false }) => {
                dispatch(
                  validateAndSelectRow({
                    cellProps,
                    rowData: { ...rowData, [column.key]: numberValue },
                    value,
                    rowKeyValue,
                    forceSelection: force,
                  })
                );
              },
            },
          });
        }
      }}
      onKeyPress={(e) => {
        if (charPermitted.indexOf(e.key) < 0) {
          e.preventDefault();
        }
      }}
    />
  );
}

export default InputNumber;
