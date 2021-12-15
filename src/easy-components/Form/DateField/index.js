/* eslint-disable import/no-cycle */
/* eslint-disable no-case-declarations */
/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, memo, useMemo } from 'react';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { format, getMonth, getYear } from 'date-fns';

import { sendData } from '~/store/modules/log/actions';
import { FieldContainer, Title, Input } from '../styles';
// eslint-disable-next-line import/no-cycle
import UserField from '../UserField';
import { sendEvent } from '../../HandlerEvent';

const StringToDate = stringDate => {
  try {
    if (stringDate) {
      const dateRef = new Date();
      const dateParts = stringDate.split('/');

      switch (dateParts.length) {
        case 1:
          const dateValue = dateParts[0];
          const captura = dateValue.match(/\d\d?/g);

          switch (captura.length) {
            case 1:
              return new Date(getYear(dateRef), getMonth(dateRef), captura[0]);
            case 2:
              return new Date(getYear(dateRef), +captura[1] - 1, captura[0]);

            default:
              const [day, month, ...year] = captura;
              if (year.join('').length === 2) {
                const newYear = +year + 2000;
                return new Date(newYear, +month - 1, day);
              }
              return new Date(year.join(''), +month - 1, day);
          }

        case 2:
          return new Date(getYear(dateRef), dateParts[1] - 1, dateParts[0]);

        case 3:
          return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        default:
          return null;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

function DateElement({
  baseName,
  name,
  label,
  hidden,
  formRef,
  settings,
  labelWidth,
  readOnly,
  fieldDefaultValue = null,
  returnFormat = null,
  mainFormRef = {},
  onChange = () => {},
  ...rest
}) {
  const charPermitted = '0123456789/';
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);

  const changed = useRef(false);

  const { fields } = settings || {};
  const selfField = (fields ? fields.find(f => f.name === name) : {}) || {};
  const fieldTitle = selfField.title || label;

  const inputRef = useRef(null);

  const {
    fieldName,
    defaultValue = fieldDefaultValue || null,
    registerField,
    error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (el, v) => {
        const textValue = v || fieldDefaultValue || defaultValue || null;
        if (textValue) {
          let rawDate = textValue;
          if (typeof textValue === 'string') {
            if (rawDate.length <= 10) rawDate = `${rawDate}T00:00:00.000`;

            if (rawDate.includes('Z')) {
              rawDate = rawDate.replace('Z', '');
            }

            el.value = format(new Date(rawDate), 'dd/MM/yyyy');
          } else {
            el.value = !rawDate ? format(rawDate, 'dd/MM/yyyy') : '';
          }
        } else {
          el.value = '';
        }
      },
      getValue: el => {
        const data = el.value === '' ? null : StringToDate(el.value);
        return returnFormat && data ? format(data, returnFormat) : data;
      },
    });
  }, [defaultValue, fieldDefaultValue, fieldName, registerField]);

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

  async function onBlur(event) {
    const evt = event.target;
    try {
      evt.value = evt.value
        ? format(StringToDate(evt.value), 'dd/MM/yyyy')
        : null;

      if (changed.current || evt.changed) {
        changed.current = false;

        let val = evt.value;

        const beforeValue = await handlerOnChange({
          value: val,
          run: 'before',
        });

        if (beforeValue !== undefined) val = beforeValue;

        evt.value = val;

        await onChange(evt);

        val = evt.value;

        const afterValue = await handlerOnChange({
          value: val,
          run: 'after',
        });

        if (afterValue !== undefined) val = afterValue;

        const dateToValid = StringToDate(val);

        evt.value = getYear(dateToValid) > 9999 ? null : val;
      }
    } catch (e) {
      evt.value = '';
      if (onChange) onChange(evt);
    }
  }

  const onChanged = async e => {
    e.persist();
    await onBlur(e);
  };

  function onFocus() {
    const text = inputRef.current.value;
    inputRef.current.setSelectionRange(0, text.length);
  }

  useEffect(() => {
    if (showLog)
      inputRef.current.onmouseover = () =>
        dispatch(
          sendData({ baseName, name: fieldName, value: inputRef.current.value })
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

  const defaultValueFormatted = useMemo(() => {
    if (defaultValue) {
      if (returnFormat === 'yyyy-MM-dd') {
        const dateSplitted = defaultValue.split('-');
        return format(
          new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2]),
          'dd/MM/yyyy'
        );
      }
      return format(new Date(defaultValue), 'dd/MM/yyyy');
    }
    return null;
  }, [defaultValue]);

  return (
    <>
      <FieldContainer
        hidden={(selfField && selfField.hidden) || hidden}
        readOnly={(selfField && selfField.readOnly) || readOnly}
      >
        {fieldTitle && (
          <Title
            labelWidth={
              (selfField && selfField.labelWidth) || labelWidth || 130
            }
          >
            <div className="title">{fieldTitle}</div>{' '}
            {error && <div className="error">{error}</div>}
          </Title>
        )}

        <Input
          ref={inputRef}
          defaultValue={defaultValueFormatted}
          hidden={hidden}
          {...selfField}
          {...rest}
          readOnly={(selfField && selfField.readOnly) || readOnly}
          onBlur={onBlur}
          onChange={() => {
            changed.current = true;
          }}
          onKeyPress={e => {
            if (charPermitted.indexOf(e.key) === -1) {
              e.target.value = format(new Date(), 'dd/MM/yyyy');
            }
            if (charPermitted.indexOf(e.key) < 0) e.preventDefault();
          }}
        />
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

export default memo(DateElement);
