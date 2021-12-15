/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';

import { sendData } from '~/store/modules/log/actions';
import { FieldContainer, Title } from '../styles';
import { Input } from './styles';
import UserField from '../UserField';
import { sendEvent } from '../../HandlerEvent';

function InputElement({
  baseName,
  name,
  label,
  hidden,
  formRef,
  mainFormRef,
  settings,
  labelWidth,
  readOnly,
  onChange,
  converter,
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

  const fieldTitle = selfField.title || label;

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue: (el, v) => {
        const newValue = converter ? converter(v) : null;
        el.setInputValue(newValue || v || '');
      },
      getValue: el => {
        return el.value === '' ? null : el.value;
      },
    });
  }, [fieldName, registerField]);

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

      const beforeValue = await handlerOnChange({ ...params, run: 'before' });
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
    inputRef.current.getInputDOMNode().setSelectionRange(0, text.length);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.getInputDOMNode().addEventListener('changed', onChanged);
      inputRef.current.getInputDOMNode().addEventListener('focus', onFocus);
    }

    return () => {
      if (inputRef.current)
        inputRef.current
          .getInputDOMNode()
          .removeEventListener('changed', onChanged);

      inputRef.current.getInputDOMNode().removeEventListener('focus', onFocus);
    };
  }, []);

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
          defaultValue={defaultValue || ''}
          hidden={hidden}
          {...selfField}
          {...rest}
          onBlur={onBlur}
          onChange={() => {
            changed.current = true;
          }}
          readOnly={(selfField && selfField.readOnly) || readOnly}
          onMouseOver={() => {
            if (showLog) {
              dispatch(
                sendData({
                  baseName,
                  name: fieldName,
                  value: inputRef.current.value,
                })
              );
            }
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

InputElement.propTypes = {
  formRef: PropTypes.shape(),
  onChange: PropTypes.func,
  baseName: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hidden: PropTypes.bool,
  settings: PropTypes.shape(),
  labelWidth: PropTypes.string,
  readOnly: PropTypes.bool,
  mainFormRef: PropTypes.shape(),
};

InputElement.defaultProps = {
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
  mainFormRef: {},
};

export default memo(InputElement);
