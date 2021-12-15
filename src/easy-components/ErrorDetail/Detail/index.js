/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "~/easy-components/Button";
import translate from "~/locale";

import {
  Container,
  Header,
  Body,
  Footer,
  Error,
  ListErrors,
  Title,
  List,
  LineError,
  Line,
  LineNumber
} from "./styles";

function Detail({ errors, onClose }) {
  const [errorList, setErrorList] = useState([]);

  const getListError = useCallback((e, line) => {
    if (e === undefined) return null;

    const list = [];

    for (const prop in e) list.push(<Error key={e[prop]}>{e[prop]}</Error>);

    return (
      <LineError key={`list-error-line-${line}`}>
        <LineNumber>Linha {line + 1}</LineNumber>
        <Line>{list}</Line>
      </LineError>
    );
  }, []);

  const getError = useCallback(
    (e, idx) => {
      if (Array.isArray(e.detail)) {
        return (
          <ListErrors key={`error-${idx}`}>
            <Title>{translate.get(e.field)}</Title>
            <List>
              {e.detail.map((d, index) => {
                return getListError(d, index);
              })}
            </List>
          </ListErrors>
        );
      }
      return <Error key={`error-detail-${idx}`}>{e.detail}</Error>;
    },
    [getListError]
  );

  useEffect(() => {
    const list = [];
    for (const prop in errors) {
      list.push({
        field: prop,
        detail: errors[prop]
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
  onClose: PropTypes.func.isRequired
};

Detail.defaultProps = {
  errors: {}
};

export default Detail;
