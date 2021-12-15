/* eslint-disable no-unused-vars */
/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, memo } from 'react';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';

import { sendData } from '~/store/modules/log/actions';
import { FieldContainer, Input } from '../styles';
import UserField from '../UserField';

function InfoElement({
  name,
  label,
  hidden,
  formRef,
  mainFormRef = {},
  settings,
  labelWidth,
  readOnly,
  ...rest
}) {
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);

  const { fields } = settings || {};
  const selfField = (fields ? fields.find(f => f.name === name) : {}) || {};

  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (showLog)
      inputRef.current.onmouseover = () =>
        dispatch(
          sendData({ name: `#${fieldName}`, value: inputRef.current.value })
        );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FieldContainer hidden={(selfField && selfField.hidden) || hidden}>
        <Input
          ref={inputRef}
          id={fieldName}
          defaultValue={defaultValue}
          hidden={hidden}
          disabled
          {...selfField}
          {...rest}
        />

        {error && !hidden && <span style={{ color: '#f00' }}>{error}</span>}
      </FieldContainer>

      <UserField
        fieldName={`#${fieldName}`}
        formRef={formRef}
        mainFormRef={mainFormRef}
        settings={settings}
      />
    </>
  );
}

export default memo(InfoElement);
