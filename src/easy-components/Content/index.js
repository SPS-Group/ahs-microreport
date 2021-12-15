import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function ContentElement({ children, visible }) {
  return <Container visible={visible}>{children}</Container>;
}

ContentElement.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  visible: PropTypes.bool,
};

ContentElement.defaultProps = {
  visible: true,
};

export default ContentElement;
