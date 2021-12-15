/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { AiOutlineCloseCircle as RemoveIcon } from 'react-icons/ai';

import { Container, Remove } from './styles';

function Element({ value, option, isReadOnly, onRemove }) {
  return (
    <Container hasError={!option}>
      {option ? option.label : `[${value}]`}
      {!isReadOnly && (
        <Remove
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            onRemove(value);
          }}
        >
          <RemoveIcon size={16} color="#ff9090" />
        </Remove>
      )}
    </Container>
  );
}

export default Element;
