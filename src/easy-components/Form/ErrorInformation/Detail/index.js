/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../Button';

import {
  Container,
  Header,
  Body,
  Footer,
  Error,
  ListErrors,
  List,
  LineError,
  Line,
  LineNumber,
} from './styles';

function Detail({ errors, onClose, translate }) {
  const [errorList, setErrorList] = useState([]);

  const getListError = useCallback((e) => {
    if (e === undefined) return null;
    const { line, ...rest } = e;

    const list = [];

    for (const prop in rest) list.push(<Error key={e[prop]}>{e[prop]}</Error>);

    return (
      <LineError key={`list-error-line-${line}`}>
        <LineNumber>Linha {line + 1}</LineNumber>
        <Line>{list}</Line>
      </LineError>
    );
  }, []);

  const getError = useCallback(
    (e, idx) => {
      if (e.detail.indexOf('[{') >= 0) {
        const listError = JSON.parse(e.detail);
        return (
          <ListErrors key={`error-${idx}`}>
            <Error>{translate(e.field)}</Error>
            <List>{listError.map((d) => getListError(d))}</List>
          </ListErrors>
        );
      }
      return <Error key={`error-detail-${idx}`}>{e.detail}</Error>;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getListError]
  );

  useEffect(() => {
    const list = [];
    for (const prop in errors) {
      list.push({
        field: prop,
        detail: errors[prop],
      });
    }
    setErrorList(list);
  }, [errors]);

  return (
    <Container>
      <Header>Erros</Header>
      <Body>{errorList.map((error, idx) => getError(error, idx))}</Body>
      <Footer>
        <Button onClick={onClose}>Fechar</Button>
      </Footer>
    </Container>
  );
}

Detail.propTypes = {
  errors: PropTypes.shape(),
  onClose: PropTypes.func.isRequired,
  translate: PropTypes.func,
};

Detail.defaultProps = {
  errors: {},
  translate: (v) => v,
};

export default Detail;
