/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Button({ buttonType, children, ...rest }) {
  return (
    <Container {...rest} className={buttonType}>
      {children}
    </Container>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  buttonType: 'Default',
  onClick: () => {},
};
