import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

function Loading({ isLoading }) {
  return isLoading ? (
    <Container>
      <FaSpinner size={32} color="#496774" />
    </Container>
  ) : null;
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};

Loading.defaultProps = {
  isLoading: false,
};

export default Loading;
