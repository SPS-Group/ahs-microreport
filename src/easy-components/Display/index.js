import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from '../Helpers';

import { Container, Title } from '../styles';
import { Input } from './styles';

function Display(
  {
    isNumber,
    name,
    hideBorder,
    labelText,
    labelWidth,
    value,
    errors,
    hidden,
    ...rest
  },
  ref
) {
  const v = isNumber ? formatNumber(value) : value || '';
  const error = errors && name && errors[name];
  return (
    <Container readOnly hidden={hidden}>
      {labelText && <Title labelWidth={labelWidth}>{labelText}</Title>}
      <Input
        hideBorder={hideBorder}
        name={name}
        value={v}
        onChange={() => {}}
        readonly
        error={error}
        {...rest}
        ref={ref}
      />
    </Container>
  );
}
export default forwardRef(Display);

Display.propTypes = {
  isNumber: PropTypes.bool,
  hideBorder: PropTypes.bool,
  name: PropTypes.string,
  labelWidth: PropTypes.number,
  labelText: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.shape()),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Display.defaultProps = {
  isNumber: false,
  hideBorder: false,
  name: null,
  labelText: null,
  labelWidth: null,
  errors: [],
  value: '',
  onChange: () => {},
};
