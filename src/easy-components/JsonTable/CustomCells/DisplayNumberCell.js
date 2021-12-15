/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
import React from 'react';

import { updateCellValue } from 'ka-table/actionCreators';
import { DisplayCell, Cell, AppendButton } from '../styles';
import Icon from '../../Icon';
import dynamicFunction from '../dynamicFunction';

export function formatNumber(value, digits = 2) {
  if (value === null || value === undefined) return '';

  const newValue = new Intl.NumberFormat('id', {
    minimumFractionDigits: digits,
  }).format(+value);

  return newValue;
}

function CustomCells({
  value,
  isModal,
  column,
  dispatch,
  rowData,
  rowKeyValue,
  onRefresh,
}) {
  const hasAppendButton =
    column &&
    column.settings &&
    column.settings.appendButton &&
    column.settings.appendButton.icon;

  const appendButton = hasAppendButton ? column.settings.appendButton : {};
  // eslint-disable-next-line no-unused-vars
  const { onClick, icon, ...iconProps } = appendButton;

  return (
    <Cell align="flex-end">
      <DisplayCell
        style={{
          justifyContent: isModal ? 'flex-start' : 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        {formatNumber(value)}
        {hasAppendButton && (
          <AppendButton
            onClick={async () => {
              if (appendButton && appendButton.onClick) {
                await dynamicFunction({
                  functionString: appendButton.onClick,
                  dispatch,
                  params: {
                    column,
                    line: rowData,
                    value,
                    rowKeyValue,
                    refresh: onRefresh,
                    setFieldValue: (columnKey, newValue) => {
                      dispatch(
                        updateCellValue(rowKeyValue, columnKey, newValue)
                      );
                    },
                  },
                });
              }
            }}
          >
            <Icon name={appendButton.icon} {...iconProps} />
          </AppendButton>
        )}
      </DisplayCell>
    </Cell>
  );
}

export default CustomCells;
