/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, memo } from 'react';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';

import { sendData } from '~/store/modules/log/actions';
import { FieldContainer, Title, Input } from '../styles';
import UserField from '../UserField';

function DisplayElement({
  baseName,
  name,
  label,
  hidden,
  formRef,
  mainFormRef,
  settings,
  labelWidth,
  readOnly,
  ...rest
}) {
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);

  const { fields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          const fullName = baseName ? `${baseName}.${name}` : name;
          return f.name === fullName;
        })
      : {}) || {};

  const fieldTitle = selfField.title || label;

  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: el => {
        return el.value === '' ? null : el.value;
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (showLog)
      inputRef.current.onmouseover = () =>
        dispatch(
          sendData({ baseName, name: fieldName, value: inputRef.current.value })
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FieldContainer
        hidden={(selfField && selfField.hidden) || hidden}
        readOnly
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
          id={fieldName}
          defaultValue={defaultValue}
          hidden={hidden}
          {...selfField}
          {...rest}
          readOnly
        />

        {error && !hidden && <span style={{ color: '#f00' }}>{error}</span>}
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

export default memo(DisplayElement);
