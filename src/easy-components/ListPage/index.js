/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { MdClose, MdKeyboardArrowLeft } from 'react-icons/md';
import {
  RiFilterLine as FilterOnIcon,
  RiFilterOffLine as FilterOffIcon,
} from 'react-icons/ri';

import Switch from '../Switch';

import {
  Page,
  Container,
  SearchPanel,
  SearchPanelContent,
  Content,
  Empty,
  Item,
  Button,
  AuxFilter,
} from './styles';
import DebounceEvent from '~/easy-components/DebounceEvent';
import SystemButton from '~/easy-components/Button';
import AuxFilterModal from './AuxFilterModal';

import Loading from '../Loading';

function ListPage(
  {
    backgroundColor,
    lastUpdatedDate,
    onSearch,
    renderItem,
    onSelect,
    onError,
    onClose,
    isShowClose,
    auxFilters,
    showSearchPanel = true,
    isClickable = true,
    isShowMaskLoading = true,
  },
  ref
) {
  const inputRef = useRef(null);
  const modalFilterRef = useRef(null);
  const filterRef = ref;

  const [data, setData] = useState([]);
  const [filterParams, setFilterParams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(
    async value => {
      try {
        setIsLoading(true && isShowMaskLoading);
        const response = await onSearch(
          value || inputRef.current.value,
          filterParams
        );
        setData(response);
        setIsLoading(false);
      } catch (ex) {
        setIsLoading(false);
        onError(ex);
      }
    },
    [isShowMaskLoading, onSearch, filterParams, onError]
  );

  useEffect(() => {
    if (inputRef.current) {
      const { value } = inputRef.current;
      refresh(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedDate, filterParams]);

  function onClear() {
    inputRef.current.value = '';
    refresh('');
  }

  useImperativeHandle(filterRef, () => {
    return {
      refresh,
      target: inputRef.current,
    };
  });

  return (
    <Page>
      <SearchPanel>
        <Switch
          mobile={
            <SystemButton
              onClick={onClose}
              style={{ marginLeft: '10px' }}
              buttonType="Emphasized"
              type="button"
            >
              Fechar
            </SystemButton>
          }
          computer={<span />}
        />
        <SearchPanelContent visible={showSearchPanel}>
          {auxFilters && auxFilters.length > 0 && (
            <>
              <AuxFilter
                onClick={evt => {
                  evt.stopPropagation();
                  evt.preventDefault();

                  if (filterParams) {
                    modalFilterRef.current.show(filterParams);
                  } else {
                    const params = {};

                    // eslint-disable-next-line no-restricted-syntax
                    for (const field of auxFilters) {
                      Object.keys(field).forEach(prop => {
                        if (prop === 'defaultValue') {
                          params[field.name] = field[prop];
                        }
                      });
                    }

                    modalFilterRef.current.show(params);
                  }
                }}
              >
                {filterParams ? (
                  <FilterOffIcon size={18} color="#fff" />
                ) : (
                  <FilterOnIcon size={18} color="#fff" />
                )}
              </AuxFilter>
              <AuxFilterModal
                ref={modalFilterRef}
                fields={auxFilters}
                onConfirm={params => {
                  setFilterParams(params);
                }}
              />
            </>
          )}
          <input
            ref={inputRef}
            placeholder="Pesquisar..."
            onChange={DebounceEvent(e => refresh(e.target.value))}
            style={{
              flex: 1,
              height: '44px',
              paddingLeft: '20px',
              border: '0',
            }}
          />
          {inputRef.current && inputRef.current.value && (
            <Button onClick={onClear} style={{ width: '30px', height: '40px' }}>
              <MdClose size={18} color="#AAA" />
            </Button>
          )}
          <div>
            {isShowClose && (
              <Switch
                mobile={<span />}
                computer={
                  <Button
                    onClick={onClose}
                    style={{ width: '30px', height: '40px' }}
                  >
                    <MdKeyboardArrowLeft size={22} color="#444" />
                  </Button>
                }
              />
            )}
          </div>
        </SearchPanelContent>
      </SearchPanel>
      <Container clickable={isClickable}>
        <Loading isLoading={isLoading} />
        <Content backgroundColor={backgroundColor}>
          {data.length === 0 && !isLoading && (
            <Empty>Nenhum Registro Encontrado</Empty>
          )}
          {data.map((d, idx) => (
            <Item
              key={`list-${idx}`}
              onClick={() => {
                onSelect(d, idx);
              }}
            >
              {renderItem(d, idx)}
            </Item>
          ))}
        </Content>
      </Container>
    </Page>
  );
}

export default forwardRef(ListPage);
