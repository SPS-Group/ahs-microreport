/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, memo } from 'react';
import { useField } from '@unform/core';

import { Container, Title } from '../../styles';
// import { Input } from './styles';
// eslint-disable-next-line import/no-cycle
import UserField from '../UserField';

const Generic = React.forwardRef(
  (
    {
      baseName,
      name,
      label,
      hidden,
      formRef,
      settings,
      labelWidth,
      readOnly,
      children,
      setData,
      getData,
    },
    ref
  ) => {
    const { fields } = settings || {};
    const selfField = (fields ? fields.find(f => f.name === name) : {}) || {};

    const inputRef = useRef(ref);

    const { fieldName, registerField, error } = useField(name);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        setValue: (e, v) => {
          setData(v);
        },
        getValue: () => {
          return getData();
        },
      });
    }, [fieldName, getData, registerField, setData]);

    return (
      <>
        <Container hidden={hidden} readOnly={selfField.readOnly || readOnly}>
          {label && (
            <Title
              labelWidth={
                (selfField && selfField.labelWidth) || labelWidth || 130
              }
            >
              <div className="title">{label}</div>{' '}
              {error && <div className="error">{error}</div>}
            </Title>
          )}

          <input ref={inputRef} type="hidden" />

          {children}

          {error && !hidden && <span style={{ color: '#f00' }}>{error}</span>}
        </Container>

        <UserField
          baseName={baseName}
          fieldName={fieldName}
          formRef={formRef}
          settings={settings}
        />
      </>
    );
  }
);

export default memo(Generic);
