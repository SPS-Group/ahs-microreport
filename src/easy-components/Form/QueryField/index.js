/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import QueryService from '../../../services/QueryService';
import Linker from '../Linker';

function QueryField({ sql, ...props }) {
  function replacePlaceholders(filter) {
    let command = sql;

    const re2 = new RegExp(`#<`, 'g');
    command = command.replace(re2, '%<');

    const re3 = new RegExp(`>#`, 'g');
    command = command.replace(re3, '>%');

    const { mainFormRef, formRef } = props;

    let mainData = null;
    if (mainFormRef && mainFormRef.current)
      mainData = mainFormRef.current.getData();

    let formData = null;
    if (formRef && formRef.current) formData = formRef.current.getData();

    const mergeData = {
      filter,
      ...mainData,
      ...formData,
    };

    const commandParams = command.match(/<[^>]+>/g) || [];

    commandParams.forEach(param => {
      const paramNotBlackets = param.substring(1, param.length - 1);

      if (mergeData[paramNotBlackets] || paramNotBlackets === 'filter') {
        const re = new RegExp(`<${paramNotBlackets}>`, 'gi');

        command = command.replace(
          re,
          mergeData[paramNotBlackets] ||
            (paramNotBlackets === 'filter' ? '' : null)
        );
      }
    });

    // Altera a string 'null' para um valor null
    const reNull = new RegExp(`'null'`, 'g');
    command = command.replace(reNull, null);

    return command;
  }
  return (
    <Linker
      {...props}
      method={async filter => {
        if (!sql) throw new Error('Comando sql não informado');

        const command = replacePlaceholders(filter);
        const response = await QueryService.execute(1, command);
        return response;
      }}
    />
  );
}

export default QueryField;
