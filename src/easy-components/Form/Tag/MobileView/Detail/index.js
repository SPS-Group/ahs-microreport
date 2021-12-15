/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useCallback, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { isMobile } from 'react-device-detect';

import Button from '../../../../Button';
import Switch from '../../../../Switch';
import FlexSpace from '../../../../FlexSpace';
import TreatError from '../../../../TreatError';
import DebounceEvent from '../../../../DebounceEvent';
import PageHeader from '../../../../PageHeader';
import PageBody from '../../../../PageBody';
import PageFooter from '../../../../PageFooter';
import Loading from '../../../../Loading';

import {
  Container,
  SearchPanel,
  ButtonIcon,
  Content,
  ItemElement,
  InputSearch,
  Page,
} from './styles';

export default function Detail({
  title,
  onConfirm,
  onClose,
  fixedData,
  renderItem,
  selValues = [],
  propFieldLabel,
  propFieldValue,
  values,
}) {
  const inputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(fixedData);
  const [selectedValues, setSelectedValues] = useState(selValues);

  const refresh = useCallback(
    async filter => {
      try {
        if (filter) {
          setIsLoading(true);

          const filterData = fixedData.filter(
            d =>
              d[propFieldLabel].toUpperCase().indexOf(filter.toUpperCase()) >= 0
          );

          setData(filterData);

          setIsLoading(false);
        } else {
          setData(fixedData);
        }
      } catch (err) {
        TreatError.showError(err);
        setIsLoading(false);
      }
    },
    [fixedData, propFieldLabel]
  );

  const onClear = e => {
    e.stopPropagation();
    // setDisplayText('');
    inputRef.current.value = null;
    refresh(null);
  };

  const onClickItem = item => {
    const filtereds = selectedValues.filter(v => v === item[propFieldValue]);
    if (filtereds.length > 0) {
      const list = selectedValues.filter(v => v !== item[propFieldValue]);
      setSelectedValues([...list]);
    } else {
      setSelectedValues([...selectedValues, item[propFieldValue]]);
    }
  };

  return (
    <Container
      onEscapeOutside={() => {
        // onClose();
      }}
    >
      <>
        <PageHeader>{title}</PageHeader>
        <Page>
          <SearchPanel>
            <Switch
              mobile={
                <Button
                  buttonType="Emphasized"
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedValues(values);
                    onClose();
                  }}
                >
                  Fechar
                </Button>
              }
            />

            <InputSearch
              ref={inputRef}
              flexible
              hideBorder
              placeholder="Pesquisar..."
              onChange={DebounceEvent(e => {
                refresh(e.target.value);
              })}
              style={{
                height: '44px',
                paddingLeft: '20px',
                border: '0',
              }}
            />
            <ButtonIcon
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onClear();
              }}
              style={{ width: '30px', height: '40px' }}
            >
              <MdClose size={18} color="#AAA" />
            </ButtonIcon>
          </SearchPanel>
          {isMobile && (
            <Switch
              mobile={
                <PageFooter>
                  <FlexSpace />
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedValues([]);
                    }}
                  >
                    Remover Seleção
                  </Button>
                  <Button
                    buttonType="Emphasized"
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      onConfirm(selectedValues);
                    }}
                  >
                    Confirmar
                  </Button>
                </PageFooter>
              }
            />
          )}
          <Content>
            <Loading isLoading={isLoading} />
            <PageBody>
              {data &&
                data.map((item, idx) => {
                  const selected = selectedValues.includes(
                    item[propFieldValue]
                  );
                  return (
                    <ItemElement
                      selected={selected}
                      key={`${item[propFieldValue]}_${idx}`}
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onClickItem(item, selectedValues);
                      }}
                    >
                      {renderItem(item, selected)}
                    </ItemElement>
                  );
                })}
            </PageBody>
          </Content>
          <span>
            <Switch
              computer={
                <PageFooter>
                  <Button
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedValues([]);
                    }}
                  >
                    Remover Todos
                  </Button>
                  <FlexSpace />
                  <>
                    <Button
                      buttonType="Emphasized"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onConfirm(selectedValues);
                      }}
                    >
                      Confirmar
                    </Button>

                    <Button
                      buttonType="Default"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();
                        onClose();
                      }}
                    >
                      Fechar
                    </Button>
                  </>
                </PageFooter>
              }
            />
          </span>
        </Page>
      </>
    </Container>
  );
}

Detail.defaultProp = {
  isMult: false,
};
