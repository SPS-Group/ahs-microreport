/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import React, { useState, useCallback, useEffect } from 'react';
import CurrencyAcronymModal from './Components/CurrencyAcronymModal';

import Modal from '~/easy-components/Modal';

import { Container, Content } from './styles';

export default function Symbol({
  title,
  symbol,
  enableChange = false,
  onSelected,
  onSearch,
}) {
  const [state, setState] = useState({
    data: [],
    isOpen: false,
    label: null,
  });

  const onOpenModal = useCallback(async () => {
    if (enableChange) {
      const response = await onSearch();
      setState({
        ...state,
        data: response || [],
        isOpen: true,
      });
    }
  }, [enableChange, onSearch, state]);

  useEffect(() => {
    setState(stateOld => {
      return {
        ...stateOld,
        label: symbol,
      };
    });
  }, [symbol]);

  return (
    <Container>
      <Content enableChange={enableChange} onClick={onOpenModal}>
        {state.label}
      </Content>
      {enableChange && (
        <Modal isOpened={state.isOpen}>
          <CurrencyAcronymModal
            title={title}
            data={state.data}
            onClose={() => {
              setState({
                ...state,
                isOpen: false,
              });
            }}
            onConfirm={value => {
              setState({
                ...state,
                label: value,
                isOpen: false,
              });
              onSelected(value);
            }}
          />
        </Modal>
      )}
    </Container>
  );
}
