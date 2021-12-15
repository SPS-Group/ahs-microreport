import React, { useState } from 'react';

import { Container } from './styles';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

export default function Number({ col, rows, idx, setRows }) {
  const [changed, setChanged] = useState(false);
  const [rawText, setRawText] = useState();
  const validChar = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    ',',
    '.',
  ];

  const contentStyle = {
    flex: col.flex,
    width: col.width,
    minWidth: col.width,
    textAlign: col.textAlign,
  };

  let customStyle = {};

  let value = '';

  let val = rows[idx][col.name] == null ? '' : rows[idx][col.name];

  if (val != null) {
    if (col.render)
      val = col.render({ value: val, line: rows[idx], idx, rows });
    if (typeof val === 'object') {
      customStyle = val.style;
      value = val.value;
    } else value = val;
  }

  function formatValue() {
    if (changed) {
      return rawText;
    }
    if (value === null || value === undefined || value === '')
      return new Intl.NumberFormat('br-BR', {
        minimumFractionDigits: col.config.decimalPrecision,
      }).format(0);

    return (value =
      typeof value === 'number'
        ? new Intl.NumberFormat('br-BR', {
            minimumFractionDigits: col.config.decimalPrecision,
          }).format(value)
        : value);
  }

  function treatKey(e) {
    if (validChar.indexOf(e.key) >= 0) return true;
    e.preventDefault();
    return false;
  }

  return (
    <Container
      readOnly={col.config.readOnly || false}
      onKeyPress={treatKey}
      // type="number"
      style={{
        ...contentStyle,
        ...customStyle,
      }}
      value={formatValue()}
      onBlur={e => {
        if (changed) {
          setChanged(false);
        }

        if (col.config) {
          if (col.config.onChange) {
            col.config.onChange({
              rawValue: rawText,
              value: rows[idx][col.name],
              rows,
              idx,
              colName: col.name,
            });
          }
        }
      }}
      onChange={e => {
        // FIX: Verificar pq não está respeitando as casas decimais colocar 4,333 na quantidade e ver q o total não respeitou

        let val = e.target.value.replace('.', '');
        val = val.replace(',', '.');

        if (val === '' || val === undefined || val === null) val = 0;

        try {
          val = parseFloat(
            parseFloat(val).toFixed(col.config.decimalPrecision)
          );
        } catch (ex) {
          val = 0;
        }

        rows[idx][col.name] = isNaN(val) ? 0 : val;
        setRawText(e.target.value);
        setChanged(true);
        setRows([...rows]);
      }}
    />
  );
}
