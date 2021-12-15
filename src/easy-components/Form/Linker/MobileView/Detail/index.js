/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MdClose } from 'react-icons/md';

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
  // isOpen,
  text,
  title,
  onConfirm,
  onClose,
  extraParams,
  fixedData,
  method,
  renderItem,
  isMult,
  values,
  searchData = [],
}) {
  const inputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(searchData);
  const [selectedValues, setSelectedValues] = useState();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const refresh = useCallback(
    async (filter, exact = false) => {
      try {
        setSelectedIndex(-1);
        setIsLoading(true);

        if (fixedData) {
          const idx = fixedData.findIndex(item => {
            if (exact) {
              return item.label.toUpperCase() === (filter || '').toUpperCase();
            }
            return (
              item.label.toUpperCase().indexOf((filter || '').toUpperCase()) >=
              0
            );
          });

          setSelectedIndex(idx);

          setData(fixedData);
        } else {
          let extraValues = {};
          if (extraParams) {
            if (typeof extraParams === 'function') {
              const params = extraParams();
              extraValues = {
                ...params,
              };
            } else {
              extraValues = {
                ...extraParams,
              };
            }
          }

          const response = await method(
            (filter || '').replace('*', '').trim(),
            extraValues
          );

          setData(response);
        }
        setIsLoading(false);
      } catch (err) {
        TreatError.showError(err);
        setIsLoading(false);
      }
    },
    [extraParams, fixedData, method]
  );

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = text;
        if (fixedData) {
          refresh(text, true);
        } else if (text === '' || text === null || data.length === 0) {
          refresh(null);
        }

        inputRef.current.focus();
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClear = e => {
    e.stopPropagation();
    // setDisplayText('');
    inputRef.current.value = null;
    refresh(null);
  };

  const onClickItem = (item, selValues) => {
    if (!isMult) onConfirm(item);
    else {
      const filtereds = selValues.filter(v => v.value === item.value);
      if (filtereds.length > 0) {
        const list = selValues.filter(v => v.value !== item.value);
        setSelectedValues([...list]);
      } else {
        setSelectedValues([...selValues, item]);
      }
    }
  };

  const onRemoveSelection = e => {
    e.stopPropagation();
    onConfirm(null);
  };

  const onKeyDown = e => {
    let idx;

    switch (e.keyCode) {
      case 27:
        onClose();
        break;

      case 9:
        // Tab
        if (selectedIndex !== -1)
          onConfirm(data.length > selectedIndex ? data[selectedIndex] : null);
        break;

      case 13:
        // Enter
        if (selectedIndex !== -1)
          onConfirm(data.length > selectedIndex ? data[selectedIndex] : null);
        break;

      case 40:
        // eslint-disable-next-line no-case-declarations
        if (selectedIndex === -1) {
          idx = 0;
        } else {
          idx = selectedIndex + 1;
          if (idx === data.length) idx = 0;
        }

        // } else if (idx < 0) idx = data.length - 1;
        setSelectedIndex(idx);
        break;

      case 38:
        // eslint-disable-next-line no-case-declarations
        if (selectedIndex === -1) {
          idx = 0;
        } else {
          idx = selectedIndex - 1;
          if (idx < 0) idx = data.length - 1;
        }
        setSelectedIndex(idx);
        break;

      default:
        break;
    }

    return true;
  };

  return (
    <Container
      onEscapeOutside={() => {
        // onClose();
      }}
    >
      <>
        <PageHeader>
          {title}
          <FlexSpace />
          <span>
            <Switch
              mobile={
                <Button onClick={onRemoveSelection}>Remover Seleção</Button>
              }
            />
          </span>
        </PageHeader>
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
              onKeyDown={onKeyDown}
              style={{
                height: '44px',
                paddingLeft: '20px',
                border: '0',
              }}
            />
            <ButtonIcon
              onClick={onClear}
              style={{ width: '30px', height: '40px' }}
            >
              <MdClose size={18} color="#AAA" />
            </ButtonIcon>
          </SearchPanel>
          <Content>
            <Loading isLoading={isLoading} />
            <PageBody>
              {data &&
                data.map((item, idx) => {
                  return (
                    <ItemElement
                      selected={selectedIndex === idx}
                      key={`${item.value}_${idx}`}
                      onClick={e => {
                        e.stopPropagation();
                        onClickItem(item, selectedValues);
                      }}
                    >
                      {renderItem(item)}
                    </ItemElement>
                  );
                })}
            </PageBody>
          </Content>
          <span>
            <Switch
              computer={
                <PageFooter>
                  <FlexSpace />
                  {isMult ? (
                    <>
                      <Button
                        buttonType="Emphasized"
                        onClick={() => {
                          onConfirm(selectedValues);
                        }}
                      >
                        Confirmar
                      </Button>
                      <Button buttonType="Default" onClick={onClose}>
                        Fechar
                      </Button>
                    </>
                  ) : (
                    <>
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
                      <Button onClick={onRemoveSelection}>
                        Remover Seleção
                      </Button>
                    </>
                  )}
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
