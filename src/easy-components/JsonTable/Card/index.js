/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import HtmlParser from 'react-html-parser';

import { replacePlaceholdersText } from '../../Helpers/replacePlaceholdersText';
import { formatCell } from '../Helpers/formatCell';
import { Container } from './styles';

function Card({ templateFields, getRowColor, data, reportSettings, onClick }) {
  const rawData = JSON.parse(JSON.stringify(data));

  templateFields.forEach((field) => {
    rawData[field.prop] = formatCell({
      value: rawData[field.prop],
      column: field.column,
      rowData: data,
      field: field.prop,
    });
    if (field.formatter) {
      if (rawData[field.prop] !== undefined) {
        rawData[field.prop] = field.formatter(rawData[field.prop]);
      }
    }
  });

  const template = replacePlaceholdersText({
    text: reportSettings.mobileCardTemplate,
    placeholderTemplate: '{?}',
    data: rawData,
  });

  const color = useMemo(() => {
    if (getRowColor) {
      const value = getRowColor({ data });
      return value;
    }
    return null;
  }, [data, getRowColor]);

  return (
    <Container color={color} onClick={() => onClick()}>
      {HtmlParser(template)}
    </Container>
  );
}

export default Card;
