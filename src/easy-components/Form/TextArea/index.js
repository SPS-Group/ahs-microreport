/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';

import { sendData } from '~/store/modules/log/actions';
import { TextArea } from './styles';
import UserField from '../UserField';
import { sendEvent } from '../../HandlerEvent';

function TextAreaElement({
  baseName,
  name,
  // label,
  hidden,
  formRef,
  mainFormRef,
  settings,
  // labelWidth,
  readOnly,
  onChange,
  fieldDefaultValue,
  ...rest
}) {
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);
  const changed = useRef(false);

  const { fields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          const fullName = baseName ? `${baseName}.${name}` : name;
          return f.name === fullName;
        })
      : {}) || {};

  const inputRef = useRef(null);

  // const fieldTitle = selfField.title || label;

  const {
    fieldName,
    defaultValue = fieldDefaultValue,
    registerField,
    // error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (el, v) => {
        let textValue = v;

        if (v === undefined)
          textValue = fieldDefaultValue || defaultValue || '';

        el.value = textValue;
      },
      getValue: el => {
        return el.value === '' ? null : el.value;
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

  async function onBlur(params) {
    params.persist();

    if (changed.current || params.target.changed) {
      changed.current = false;

      let val = params.target.value;

      const beforeValue = await handlerOnChange({
        ...params,
        run: 'before',
      });

      if (beforeValue !== undefined) val = beforeValue;

      params.target.value = val;

      await onChange(params);

      val = params.target.value;

      const afterValue = await handlerOnChange({ ...params, run: 'after' });
      if (afterValue !== undefined) val = afterValue;

      inputRef.current.value = val;
    }
  }

  const onChanged = async e => {
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
      if (inputRef.current && inputRef.current.removeEventListener)
        inputRef.current.removeEventListener('changed', onChanged);
    };
  }, []);

  return (
    <>
      <TextArea
        wrap="off"
        ref={inputRef}
        defaultValue={defaultValue}
        hidden={hidden}
        {...selfField}
        {...rest}
        style={{ resize: 'none' }}
        readOnly={(selfField && selfField.readOnly) || readOnly}
        onBlur={onBlur}
        onChange={() => {
          changed.current = true;
        }}
        /* onKeyDown={e => {
          if (e.keyCode === 13) {
            const pos = e.currentTarget.selectionEnd;
            const text = e.currentTarget.value;
            e.currentTarget.value = `${text.slice(0, pos)}\n${text.slice(pos)}`;
            e.currentTarget.setSelectionRange(pos + 1, pos + 1);
          }
        }} */
        // onChange={DebounceEvent(onChange)}
      />

      <UserField
        baseName={baseName}
        fieldName={fieldName}
        formRef={formRef}
        mainFormRef={mainFormRef}
        settings={settings}
        readOnly={readOnly}
      />
    </>
  );
}

TextAreaElement.propTypes = {
  formRef: PropTypes.shape(),
  onChange: PropTypes.func,
  baseName: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hidden: PropTypes.bool,
  settings: PropTypes.shape(),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  fieldDefaultValue: PropTypes.string,
  mainFormRef: PropTypes.shape(),
};

TextAreaElement.defaultProps = {
  formRef: null,
  baseName: null,
  settings: null,
  onChange: val => {
    return val;
  },
  label: null,
  labelWidth: null,
  readOnly: false,
  hidden: false,
  fieldDefaultValue: '',
  mainFormRef: {},
};

export default memo(TextAreaElement);
