/* eslint-disable react/button-has-type */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable no-new-func */
import React, { useContext } from 'react';

import { deleteRow } from 'ka-table/actionCreators';

import Icon from '~/easy-components/Icon';
import Button from '~/easy-components/Button';

import dynamicFunction from '../dynamicFunction';
import { PageContext } from '../index';

import { Cell } from '../styles';

function ButtonCell({
  column,
  rowData,
  value,
  rowKeyValue,
  dispatch: dispatchKaTable,
  onRefresh,
  showLoading,
  settings,
  paramsModal,
  scopes = {},
}) {
  const { promptRef } = useContext(PageContext);

  const buttonProps = {
    buttonType: column.settings.buttonType,
    style: column.settings.style,
    disabled: value === 'N',
    onClick: async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (column.settings) {
        await dynamicFunction({
          functionString: column.settings.onClick,
          settings,
          promptRef,
          params: {
            column,
            line: rowData,
            value,
            refresh: onRefresh,
            showLoading,
            deleteRow: () => dispatchKaTable(deleteRow(rowKeyValue)),
            paramsModal,
            ...scopes.row,
          },
        });
      }
    },
  };

  function getIcon() {
    if (column.settings.buttonType === 'iconButton') {
      const { options } = column.settings;

      return (
        <Icon
          {...buttonProps}
          style={{
            cursor: buttonProps.disabled ? 'not-allowed' : 'pointer',
            pointerEvents: buttonProps.disabled ? 'none' : 'all',
          }}
          name={options.icon}
          size={options.size}
          color={buttonProps.disabled ? '#ddd' : options.color}
        />
      );
    }

    return null;
  }

  function getButton() {
    switch (column.settings.buttonType) {
      case 'iconButton':
        return getIcon();

      default:
        return <Button {...buttonProps}>{column.settings.title}</Button>;
    }
  }

  return <>{value !== 'H' && <Cell align="center">{getButton()}</Cell>}</>;
}

export default ButtonCell;
