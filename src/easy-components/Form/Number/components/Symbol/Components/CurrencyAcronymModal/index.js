/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button, PageFooter } from '~/easy-components';
import FlexSpace from '~/easy-components/FlexSpace';
import PageBody from '~/easy-components/PageBody';
import PageHeader from '~/easy-components/PageHeader';

import { Container, Content, AcronymList } from './styles';

function CurrencyAcronymModal({ title, onClose, onConfirm, data }) {
  const onSelectedCurrency = currency => {
    onConfirm(currency);
  };

  return (
    <Container>
      <PageHeader>{title} - Alteração de Símbolo</PageHeader>
      <PageBody>
        <Content>
          {data.map(currency => {
            return (
              <AcronymList
                key={`${currency.value}`}
                onClick={e => {
                  e.stopPropagation();
                  onSelectedCurrency(currency.value);
                }}
              >
                <div>{currency.value}</div>
                <h1>{currency.label}</h1>
              </AcronymList>
            );
          })}
        </Content>
      </PageBody>
      <PageFooter style={{ flex: 'initial' }}>
        <FlexSpace />
        <Button onClick={onClose}>Fechar</Button>
      </PageFooter>
    </Container>
  );
}

export default CurrencyAcronymModal;
