/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useRef,
  memo,
  useCallback,
  useState,
  cloneElement,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { Decimal } from 'decimal.js';
import { sendData } from '~/store/modules/log/actions';
import { FieldContainer, Title } from '../styles';
import { Input, Content } from './styles';

import TreatError from '../../TreatError';
import Modal from '../../Modal';
import LinkIcon from '../../LinkIcon';

// eslint-disable-next-line import/no-cycle
import UserField from '../UserField';
import Symbol from './components/Symbol';

import { sendEvent } from '../../HandlerEvent';

function NumberElement(
  {
    baseName,
    name,
    label,
    hidden,
    formRef,
    settings,
    labelWidth,
    readOnly,
    symbol,
    enableChangeSymbol = false,
    onSearchSymbol,
    onSelectedSymbol = () => {},
    decimalLength = 2,
    showLink = false,
    onLinkClick,
    modal,
    mainFormRef = {},
    fieldDefaultValue,
    onChange = () => {},
    ...rest
  },
  ref
) {
  const dispatch = useDispatch();

  const changed = useRef(false);
  const panelRef = useRef(null);

  const [modalShow, setModalShow] = useState(false);
  const [symbolInputValue, setSymbolInputValue] = useState('');
  const [, refreshHender] = useState(false);

  const showLog = useSelector(({ log }) => log.isShow);
  const charPermitted = '0123456789.,';

  const { fields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          const fullName = baseName ? `${baseName}.${name}` : name;
          return f.name === fullName;
        })
      : {}) || {};

  const auxRef = ref;

  const inputRef = useRef(null);

  const fieldTitle = selfField.title || label;

  const {
    fieldName,
    defaultValue = fieldDefaultValue,
    registerField,
    error,
  } = useField(name);

  const formatNumber = useCallback((value, decimalPrecision) => {
    if (typeof value === 'string') {
      // -> /[^0-9.,]/g, ''
      let val = value.split('.').join('');
      val = val.split(',').join('.');
      val = +val;

      const t = new Decimal(val);
      return parseFloat(t.toFixed(parseInt(decimalPrecision, 10)));
    }

    return value;
  }, []);

  function isEmptyObject(obj) {
    for (const prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  function formatMoney(amount, decimalCount, decimal = '.', thousands = ',') {
    try {
      if (typeof amount === 'object') {
        if (isEmptyObject(amount)) return '';
      }

      if (amount === null) return '';

      decimalCount = Math.abs(decimalCount);
      // eslint-disable-next-line no-restricted-globals
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      // eslint-disable-next-line radix
      const i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();

      const j = i.length > 3 ? i.length % 3 : 0;

      const formattedData =
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : '');

      return formattedData;
    } catch (e) {
      return 0;
    }
  }

  const mask = useCallback(
    value => {
      return formatMoney(value, decimalLength, ',', '.');
    },
    [decimalLength]
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (e, v) => {
        let textValue = v;
        if (textValue === undefined)
          textValue = fieldDefaultValue || defaultValue || '';
        e.value = mask(textValue);
      },
      getValue: e => {
        const v = e.value === '' ? null : e.value;

        const newValue =
          v !== null ? formatNumber(e.value, decimalLength) : null;

        return newValue;
      },
    });
  }, [
    decimalLength,
    defaultValue,
    fieldDefaultValue,
    fieldName,
    formatNumber,
    mask,
    registerField,
  ]);

  const handlerOnChange = async params => {
    const response = await sendEvent({
      settings,
      eventName: 'onchange',
      params,
      run: params.run,
      element: inputRef.current,
      formRef,
      mainFormRef,
      events: selfField.events,
    });

    return response || params.value;
  };

  async function handlerChange(event) {
    try {
      changed.current = false;

      let { value } = event.target;

      const val = formatNumber(value, decimalLength);

      const newValue = await handlerOnChange({
        value: val,
        run: 'before',
      });

      if (newValue !== undefined) value = newValue;

      await onChange(value);

      const afterValue = await handlerOnChange({
        value,
        run: 'after',
      });

      if (afterValue !== undefined) value = afterValue;

      inputRef.current.value = mask(value);
    } catch (e) {
      TreatError.showError(e);
    }
  }

  const onChanged = async e => {
    await handlerChange(e);
  };

  function onFocus() {
    const text = inputRef.current.value;
    inputRef.current.setSelectionRange(0, text.length);
  }

  useEffect(() => {
    if (showLog)
      inputRef.current.onmouseover = () =>
        dispatch(
          sendData({
            baseName,
            name: fieldName,
            value: `${formatNumber(inputRef.current.value, decimalLength)}`,
          })
        );

    inputRef.current.addEventListener('changed', onChanged);
    inputRef.current.addEventListener('focus', onFocus);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (inputRef.current && inputRef.current.removeEventListener) {
        inputRef.current.removeEventListener('changed', onChanged);
        inputRef.current.removeEventListener('focus', onFocus);
      }
    };
  }, []);

  const defaultValueFormatted = mask(defaultValue);

  function onLink() {
    if (onLinkClick)
      onLinkClick({
        setModalShow,
        value: inputRef.current.value,
      });
    else setModalShow(true);
  }

  useImperativeHandle(auxRef, () => {
    return {
      setSymbol: acronym => {
        setSymbolInputValue(acronym);
      },
      input: inputRef.current,
      refreshHender,
    };
  });

  function onHidden() {
    if (hidden) {
      if (typeof hidden === 'function') {
        const status = hidden();
        return status;
      }

      return hidden;
    }
    return selfField && selfField.hidden;
  }

  useEffect(() => {
    setSymbolInputValue(symbol);
  }, [symbol]);

  let isEnabledChangeSymbol = enableChangeSymbol;

  if (selfField && selfField.readOnly) {
    isEnabledChangeSymbol = false;
  }

  return (
    <>
      <FieldContainer
        ref={panelRef}
        hidden={onHidden(panelRef)}
        readOnly={(selfField && selfField.readOnly) || readOnly}
      >
        {fieldTitle && (
          <Title
            labelWidth={
              (selfField && selfField.labelWidth) || labelWidth || 130
            }
          >
            <div className="title">
              {fieldTitle}
              {showLink && (
                <span>
                  <LinkIcon onClick={onLink} />
                </span>
              )}
            </div>
            {error && <div className="error">{error}</div>}
          </Title>
        )}
        <Content readOnly={(selfField && selfField.readOnly) || readOnly}>
          {symbolInputValue && (
            <Symbol
              title={fieldTitle}
              enableChange={isEnabledChangeSymbol}
              symbol={symbolInputValue}
              onSearch={onSearchSymbol}
              onSelected={selectedSymbol => {
                setSymbolInputValue(selectedSymbol);
                const result = onSelectedSymbol(selectedSymbol);
                return result;
              }}
            />
          )}
          <Input
            ref={inputRef}
            defaultValue={defaultValueFormatted}
            hidden={hidden}
            {...selfField}
            {...rest}
            readOnly={(selfField && selfField.readOnly) || readOnly}
            onKeyUp={e => {
              if (e.ctrlKey && e.key === 'v') {
                changed.current = true;
              } else if (e.key === 'Backspace' || e.key === 'Delete') {
                changed.current = true;
              }
            }}
            onKeyPress={e => {
              if (charPermitted.indexOf(e.key) < 0) {
                e.preventDefault();
              } else {
                changed.current = true;
              }
            }}
            onBlur={async e => {
              e.persist();
              if (changed.current || e.target.changed) await handlerChange(e);
            }}
            style={{ textAlign: 'right' }}
          />
        </Content>

        {modal && (
          <Modal isOpened={modalShow}>
            {modalShow &&
              cloneElement(modal, { onClose: () => setModalShow(false) })}
          </Modal>
        )}
      </FieldContainer>

      <UserField
        baseName={baseName}
        fieldName={fieldName}
        formRef={formRef}
        mainFormRef={mainFormRef}
        settings={settings}
        readOnly={readOnly}
        labelWidth={(selfField && selfField.labelWidth) || labelWidth || 130}
      />
    </>
  );
}

export default memo(forwardRef(NumberElement));
