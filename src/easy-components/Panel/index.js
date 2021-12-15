import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Panel({ children, width, labelWidth, ...rest }) {
  /* if (Array.isArray(children))
    children.map(el => (el.props.labelWidth = labelWidth)); */

  return (
    <Container width={width} labelWidth={labelWidth} {...rest}>
      {children}
    </Container>
  );
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
    PropTypes.element,
    PropTypes.any,
  ]),
  width: PropTypes.string,
  labelWidth: PropTypes.string,
};

Panel.defaultProps = {
  children: null,
  width: null,
  labelWidth: '130px',
};
