/* eslint-disable react/prop-types */
import React from 'react';

import Element from '../Element';
import { Container } from './styles';

function Elements({
  readOnly,
  separator,
  onRemove,
  showLog,
  dispatch,
  sendData,
  baseName,
  valueFieldName,
  selectedValues,
  options,
  propFieldValue,
}) {
  return (
    <Container
      readOnly={readOnly}
      onMouseOver={() => {
        if (showLog) {
          dispatch(
            sendData({
              baseName,
              name: valueFieldName,
              value: selectedValues.join(separator),
            })
          );
        }
      }}
    >
      {options.length === 0
        ? null
        : selectedValues.map(value => {
            const option = options.find(opt => opt[propFieldValue] === value);
            return (
              <Element
                key={value}
                value={value}
                option={option}
                isReadOnly={readOnly}
                onRemove={onRemove}
              />
            );
          })}
    </Container>
  );
}

export default Elements;
