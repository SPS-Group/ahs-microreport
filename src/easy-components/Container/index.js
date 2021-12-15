import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Loading from '~/easy-components/Loading';

function ContainerElement({ children, isLoading }) {
  return (
    <Container>
      <Loading isLoading={isLoading} />
      {children}
    </Container>
  );
}

ContainerElement.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

ContainerElement.defaultProps = {
  isLoading: false,
};

export default ContainerElement;
