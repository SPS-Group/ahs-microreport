/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';

import { AiFillEdit } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';
import Modal from '../../Modal';
import { sendData } from '~/store/modules/log/actions';
import {
  FieldContainer,
  Title,
  Input,
  UpdateIcon,
  PanelInput,
} from '../styles';
import UserField from '../UserField';
import { sendEvent } from '../../HandlerEvent';
import FullScreenViewer from './FullScreenViewer';
import { createSyncFunctionByString } from '~/easy-components/AsyncFunctionString';

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
  fieldDefaultValue,
  fullScreen,
  ...rest
}) {
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);
  const changed = useRef(false);
  const [isShowFullScreen, setIsShowFullScreen] = useState(false);
  const tooltipRef = useRef();
  const iconRef = useRef();

  const { fields, userFields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          const fullName = baseName ? `${baseName}.${name}` : name;
          return f.name === fullName;
        })
      : {}) || {};
  const userField =
    (userFields
      ? userFields.find(f => {
          return f.name === name;
        })
      : {}) || {};

  const inputRef = useRef(null);

  const isFullScreen = !!(
    fullScreen ||
    !!userField.fullScreen ||
    !!selfField.fullScreen
  );

  const fieldTitle = selfField.title || label;

  const {
    fieldName,
    defaultValue = fieldDefaultValue,
    registerField,
    error,
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
      element: params.element,
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
        element: params,
      });

      if (beforeValue !== undefined) val = beforeValue;

      params.target.value = val;

      await onChange(params);

      val = params.target.value;

      const afterValue = await handlerOnChange({
        ...params,
        run: 'after',
        element: params,
      });
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
      if (inputRef.current && inputRef.current.removeEventListener) {
        inputRef.current.removeEventListener('changed', onChanged);
        inputRef.current.removeEventListener('focus', onFocus);
      }
    };
  }, []);

  const nativeOnChange = e => {
    changed.current = true;

    if (isFullScreen) {
      tooltipRef.current.innerHTML = e.target.value;
    }
  };

  const tooltipText = useMemo(() => {
    if (!isFullScreen) return '';

    let def = '';

    if (typeof defaultValue === 'string') {
      def = defaultValue;
    }
    return (
      (inputRef && inputRef.current && inputRef.current.value
        ? inputRef.current.value
        : def) || ''
    );
  }, [inputRef.current, defaultValue, isShowFullScreen]);
  const isHidden = useMemo(() => {
    if (selfField) {
      if (typeof selfField.hidden === 'boolean') {
        return !!(selfField.hidden || hidden);
      }

      if (typeof selfField.hidden === 'string') {
        const hiddenFunction = createSyncFunctionByString({
          functionString: selfField.hidden,
        });
        return !!(hiddenFunction({ formRef, selfField }) || hidden);
      }
    }

    return !!hidden;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, selfField]);

  return (
    <>
      <FieldContainer
        hidden={isHidden}
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

        <PanelInput>
          <div
            className={
              (selfField && selfField.readOnly) || readOnly ? 'disabled' : ''
            }
          >
            {!isFullScreen && (
              <Input
                ref={inputRef}
                defaultValue={defaultValue}
                hidden={hidden}
                {...selfField}
                {...rest}
                onBlur={onBlur}
                onChange={nativeOnChange}
                readOnly={(selfField && selfField.readOnly) || readOnly}
              />
            )}
            {isFullScreen && (
              <textarea
                ref={inputRef}
                className="input-textarea"
                rows="1"
                defaultValue={defaultValue}
                hidden={hidden}
                {...selfField}
                {...rest}
                onBlur={onBlur}
                onChange={nativeOnChange}
                readOnly={(selfField && selfField.readOnly) || readOnly}
              />
            )}
            {isFullScreen && (
              <>
                <UpdateIcon
                  ref={iconRef}
                  data-tip
                  data-for={`tooltip-text-${name}`}
                  className="hoverable"
                  readOnly={(selfField && selfField.readOnly) || readOnly}
                  onClick={() => {
                    setIsShowFullScreen(true);
                  }}
                >
                  <AiFillEdit size={12} color="#aaa" />
                </UpdateIcon>
                <ReactTooltip
                  id={`tooltip-text-${name}`}
                  place="left"
                  effect="solid"
                  backgroundColor="#fff"
                  textColor="#303030"
                  multiline
                  delayShow={500}
                  className="input-textarea-tooltip"
                >
                  <article ref={tooltipRef}>{tooltipText}</article>
                </ReactTooltip>
              </>
            )}

            {isFullScreen && (
              <Modal isOpened={isShowFullScreen}>
                {isShowFullScreen ? (
                  <FullScreenViewer
                    name={name}
                    inputRef={inputRef}
                    title={fieldTitle}
                    onClose={() => {
                      setIsShowFullScreen(false);
                    }}
                    defaultValue={defaultValue}
                    hidden={hidden}
                    {...selfField}
                    {...rest}
                    onBlur={onBlur}
                    onChange={nativeOnChange}
                    readOnly={(selfField && selfField.readOnly) || readOnly}
                  />
                ) : (
                  <></>
                )}
              </Modal>
            )}
          </div>
        </PanelInput>
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
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  mainFormRef: PropTypes.shape(),
  fullScreen: PropTypes.bool,
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
  fullScreen: false,
};

export default InputElement;
