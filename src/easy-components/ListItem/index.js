import React from 'react';
import PropTypes from 'prop-types';
import AuxInfo from '~/easy-components/AuxInfo';
import { Container } from './styles';

function ListItem({ title, description, auxInfo }) {
  return (
    <Container>
      <h1>{title}</h1>
      <div>{description}</div>
      <AuxInfo text={auxInfo} />
    </Container>
  );
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  auxInfo: PropTypes.string,
};

ListItem.defaultProps = {
  description: null,
  auxInfo: null,
};

export default ListItem;
