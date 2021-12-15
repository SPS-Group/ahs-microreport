/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { Container } from './styles';

function Toggle({ name, size, onClick, checked }, ref) {
  const [state, setState] = useState(checked);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {},
    };
  });

  return (
    <Container size={size}>
      <input
        type="checkbox"
        name={name}
        id={name}
        onClick={() => {
          setState(oldState => !oldState);
          if (onClick) onClick(!state);
        }}
        checked={state}
      />
      <label htmlFor={name} />
    </Container>
  );
}

export default forwardRef(Toggle);
