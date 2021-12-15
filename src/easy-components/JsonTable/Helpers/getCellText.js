/* eslint-disable import/no-cycle */
import React from 'react';

import LinkerCell from '../CustomCells/LinkerCell';
import ButtonCell from '../CustomCells/ButtonCell';
import InputText from '../CustomCells/InputText';
import InputNumber from '../CustomCells/InputNumber';
import InputDate from '../CustomCells/InputDate';
import DisplayNumberCell from '../CustomCells/DisplayNumberCell';
import DisplayCell from '../CustomCells/DisplayCell';
import DisplayDateCell from '../CustomCells/DisplayDateCell';
import OptionCell from '../CustomCells/OptionCell';
import SelectionCell from '../CustomCells/SelectionCell';
import validateAndSelectRow from '../CustomActions/validateAndSelectRow';

export default function getCellText({
  field,
  column,
  rowData,
  value,
  settings,
  onRefresh,
  showLoading,
  rowKeyValue,
  dispatch,
  props: cellProps,
  isModal = false,
  paramsModal,
  style,
  scopes,
}) {
  const props = {
    field,
    column,
    rowData,
    value,
    settings,
    isModal,
    rowKeyValue,
    dispatch,
    style,
    cellProps,
    scopes,
  };

  if (column.settings) {
    switch (column.settings.type) {
      case 'selection':
        return (
          <SelectionCell
            {...cellProps}
            settings={settings}
            onClick={async () => {
              dispatch(
                validateAndSelectRow({
                  cellProps,
                  rowData,
                  value,
                  rowKeyValue,
                })
              );
            }}
          />
        );

      case 'link':
        return <LinkerCell {...props} settings={settings} />;

      case 'button':
        return (
          <ButtonCell
            {...props}
            onRefresh={onRefresh}
            showLoading={showLoading}
            settings={settings}
            paramsModal={paramsModal}
          />
        );

      case 'inputText':
        return <InputText {...props} inputType="text" />;

      case 'inputNumber':
        return (
          <InputNumber {...props} onRefresh={onRefresh} inputType="number" />
        );

      case 'inputDate':
        return <InputDate {...props} inputType="number" />;

      case 'number':
        return <DisplayNumberCell {...props} />;

      case 'date':
        return <DisplayDateCell {...props} />;

      case 'option':
        return <OptionCell {...props} />;

      default:
        return <DisplayCell {...props} />;
    }
  }

  return null;
}
