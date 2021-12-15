import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

function Tab({ toolbar, children }) {
  return (
    <Container>
      {toolbar}
      <Content>{children}</Content>
    </Container>
  );
}

Tab.propTypes = {
  toolbar: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Tab.defaultProps = {
  toolbar: null,
};

export default Tab;
