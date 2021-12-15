/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

import { sendData } from '~/store/modules/log/actions';
import { Title, FieldContainer } from '../styles';
import { Input } from './styles';

// eslint-disable-next-line import/no-cycle
import UserField from '../UserField';

import { sendEvent } from '../../HandlerEvent';

function CheckboxElement({
  valueChecked,
  valueUnchecked,
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
  disableRenderMobile,
  height,
  ...rest
}) {
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);

  const { fields } = settings || {};
  const selfField = (fields ? fields.find(f => f.name === name) : {}) || {};

  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const fieldTitle = selfField.title || label;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue: el => {
        el.checked = false;
      },
      setValue: (el, v) => {
        el.checked = v === valueChecked;
      },
      getValue: el => {
        return el.checked ? valueChecked : valueUnchecked;
      },
    });
  }, [fieldName, registerField, valueChecked, valueUnchecked]);

  useEffect(() => {
    if (showLog)
      inputRef.current.onmouseover = () =>
        dispatch(
          sendData({ baseName, name: fieldName, value: inputRef.current.value })
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function onChangeHandler(params) {
    const { value, checked } = params.currentTarget;

    let val = value;

    const newValue = await handlerOnChange({
      value: val,
      run: 'before',
      checked,
    });

    if (newValue !== undefined) val = newValue;

    if (onChange) {
      const returnValue = await onChange(checked, val);
      if (returnValue !== undefined) val = returnValue;
    }

    const afterValue = await handlerOnChange({
      value: val,
      run: 'after',
      checked,
    });

    if (afterValue !== undefined) val = afterValue;

    return val;
  }

  return (
    <>
      <FieldContainer
        flexible={false}
        hidden={(selfField && selfField.hidden) || hidden}
        readOnly={(selfField && selfField.readOnly) || readOnly}
        disableRenderMobile={disableRenderMobile}
        height={height}
        isCheckBox
        style={
          isMobile
            ? {
                alignItems: 'center',
              }
            : {
                height,
                alignItems: 'center',
              }
        }
      >
        <Input
          type="checkbox"
          ref={inputRef}
          defaultChecked={defaultValue === valueChecked}
          hidden={hidden}
          {...selfField}
          {...rest}
          onChange={onChangeHandler}
          disabled={(selfField && selfField.readOnly) || readOnly}
        />
        {fieldTitle && (
          <Title
            hideLine
            labelWidth={
              (selfField && selfField.labelWidth) || labelWidth || 130
            }
          >
            <div className="title">{fieldTitle}</div>{' '}
            {error && <div className="error">{error}</div>}
          </Title>
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

CheckboxElement.propTypes = {
  valueChecked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formRef: PropTypes.shape(),
  onChange: PropTypes.func,
  baseName: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hidden: PropTypes.bool,
  settings: PropTypes.shape(),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  disableRenderMobile: PropTypes.bool,
  height: PropTypes.string,
  mainFormRef: PropTypes.shape(),
  valueUnchecked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CheckboxElement.defaultProps = {
  valueUnchecked: 'N',
  valueChecked: 'Y',
  formRef: null,
  baseName: null,
  settings: null,
  onChange: () => {},
  label: null,
  labelWidth: null,
  readOnly: false,
  hidden: false,
  disableRenderMobile: false,
  height: '32px',
  mainFormRef: {},
};

export default memo(CheckboxElement);
