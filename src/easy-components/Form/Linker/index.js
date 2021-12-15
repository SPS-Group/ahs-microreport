/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-case-declarations */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

import LinkIcon from '../../LinkIcon';
import Modal from '../../Modal';
import Switch from '../../Switch';
import TreatError from '../../TreatError';
import SelectItem from '../../SelectItem';
import { sendEvent } from '../../HandlerEvent';
import UserField from '../UserField';
import { FieldContainer, Title } from '../styles';

import { Input, PanelInput, SearchIcon, LoadIcon } from './styles';
import MobileView from './MobileView';
import SearchViewer from './MobileView/Detail';

import { sendData } from '~/store/modules/log/actions';

function LinkerElement({
  baseName,
  name,
  valueField,
  label,
  hidden,
  formRef,
  mainFormRef,
  settings,
  labelWidth,
  readOnly,
  method: clientMethod,
  onChange,
  fixedData,
  onLinkClick,
  showLink,
  fieldDefaultValue,
  propFieldValue = 'value',
  propFieldLabel = 'label',
  renderItem,
  ...rest
}) {
  const renderized = useRef(false);

  useEffect(() => {
    renderized.current = true;
    return () => {
      renderized.current = false;
    };
  }, []);

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

  const [isShowSearchViewer, setIsShowSearchViewer] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mobileText, setMobileText] = useState('');
  const [readOnlyElement, setReadOnlyElement] = useState(false);

  const inputRef = useRef(null);
  const valueRef = useRef(null);

  const fieldTitle = selfField.title || label;

  const {
    fieldName,
    defaultValue = fieldDefaultValue || '',
    registerField,
    error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue: el => {
        el.value = null;
        setMobileText(null);
      },
      setValue: (el, v) => {
        let textValue = v;

        if (textValue === undefined)
          textValue = fieldDefaultValue || defaultValue || '';

        const fixData = selfField.fixedData || fixedData;

        if (fixData && textValue !== null) {
          const selectedData = fixData.find(
            d => d.value.toString() === textValue.toString()
          );

          valueRef.current.value = v;
          textValue = selectedData ? selectedData[propFieldLabel] : null;
        }

        el.value = textValue;
        setMobileText(textValue || '');
      },
      getValue: el => {
        const fixData = selfField.fixedData || fixedData;

        if (fixData) {
          const selectedData = fixData.find(
            d => d[propFieldLabel].toString() === el.value.toString()
          );
          return selectedData ? selectedData.value : null;
        }

        return el.value === '' ? null : el.value;
      },
    });
  }, [defaultValue, fieldDefaultValue, fieldName, fixedData, registerField]);

  const {
    fieldName: valueFieldName,
    defaultValue: valueDefaultValue = fieldDefaultValue || null,
    registerField: valueRegisterField,
    error: valueError,
  } = useField(valueField);

  useEffect(() => {
    if (valueFieldName !== fieldName)
      valueRegisterField({
        name: valueFieldName,
        ref: valueRef.current,
        path: 'value',
        getValue: el => {
          return el.value === '' ? null : el.value;
        },
      });
  }, [fieldName, valueFieldName, valueRegisterField]);

  function onFocus() {
    const text = inputRef.current.value;
    inputRef.current.setSelectionRange(0, text.length);
  }

  const handlerEvent = async (eventName, params, run) => {
    const response = await sendEvent({
      settings,
      eventName,
      params,
      run,
      formRef,
      mainFormRef,
      element: inputRef.current,
      events: selfField.events,
    });

    return response || params;
  };

  async function handleChange(data) {
    try {
      const newValue = await handlerEvent('onchange', data, 'before');
      await onChange(newValue, inputRef, valueRef);
      await handlerEvent('onchange', data, 'after');
    } catch (e) {
      TreatError.showError(e);
    }
  }

  const onChanged = async () => {
    await handleChange({
      value: valueRef.current.value,
      label: inputRef.current.value,
      element: inputRef.current,
    });
  };

  useEffect(() => {
    inputRef.current.setReadOnly = status => {
      setReadOnlyElement(status);
    };

    if (showLog) {
      inputRef.current.onmouseover = () => {
        if (valueFieldName !== fieldName)
          dispatch(
            sendData([
              { baseName, name: fieldName, value: inputRef.current.value },
              { baseName, name: valueFieldName, value: valueRef.current.value },
            ])
          );
        else
          dispatch(
            sendData([
              { baseName, name: fieldName, value: valueRef.current.value },
            ])
          );
      };
    }

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

  useEffect(() => {
    const fixData = selfField.fixedData || fixedData;

    if (fixData && fixData.length > 0) {
      const defValue = valueRef.current.value || fieldDefaultValue;
      if (defValue) {
        const selectedData = fixData.find(
          d => d.value.toString() === defValue.toString()
        );

        valueRef.current.value = selectedData
          ? selectedData[propFieldValue]
          : null;
        inputRef.current.value = selectedData
          ? selectedData[propFieldLabel]
          : null;

        setMobileText(inputRef.current.value);
      }
    }
  }, [fieldDefaultValue]);

  async function onSelect(data, setFocus = true) {
    setIsShowSearchViewer(false);
    setIsLoading(false);

    if (inputRef.current) {
      inputRef.current.changed = false;
      formRef.current.setFieldError(fieldName, null);

      if (data) {
        inputRef.current.value = data[propFieldLabel];
        valueRef.current.value = data[propFieldValue];
      } else {
        inputRef.current.value = null;
        valueRef.current.value = null;
      }

      if (setFocus) inputRef.current.focus();

      await handleChange(data);
    }
  }

  async function onBlur(e) {
    e.persist();

    const textChanged = e.target.changed;
    const searchTextInput = e.target.value;

    if (textChanged && isLoading === false) {
      if (searchTextInput === '' || searchTextInput === null) {
        valueRef.current.value = null;
        formRef.current.setFieldError(fieldName, null);
        e.target.changed = false;
        await handleChange(null);
      } else {
        setIsLoading(true);

        let response = [];

        const fixData = selfField.fixedData || fixedData;

        if (fixData) {
          response = fixData.filter(
            d =>
              d[propFieldLabel]
                .toString()
                .toUpperCase()
                .indexOf(inputRef.current.value.toString().toUpperCase()) >= 0
          );
        } else {
          response = await method(searchTextInput);
        }

        switch (response.length) {
          case 0:
            if (formRef.current) {
              formRef.current.setFieldError(fieldName, 'Valor inválido');
              valueRef.current.value = null;
              inputRef.current.focus();
              await handleChange(null);
              setIsLoading(false);
            }
            break;

          case 1:
            await onSelect(response[0], false);
            setIsLoading(false);
            break;

          default:
            setSearchData(response);
            setIsShowSearchViewer(true);
            setSearchText(searchTextInput);
            if (formRef.current)
              formRef.current.setFieldError(fieldName, 'Valor inválido');
            await handleChange(null);
            break;
        }
      }
    }
  }

  function onLink() {
    onLinkClick({
      value: valueRef.current.value,
      label: valueRef.current.value,
    });
  }

  async function method(props) {
    /* 
    const clientEvent = getEvent('onlist', 'before');
    if (clientEvent) {
      const response = await handlerEvent('onlist', props, 'before');
      if (response) return response || [];
    } */

    const clientResponse = await clientMethod(props);

    return clientResponse;
  }

  function handleRenderItem(data) {
    return (
      <SelectItem
        auxInfo={data.auxInfo || data.AuxInfo}
        header={data[propFieldLabel]}
      />
    );
  }

  try {
    return (
      <>
        <input
          ref={valueRef}
          id={valueFieldName}
          defaultValue={valueDefaultValue}
          hidden
        />

        <FieldContainer
          hidden={(selfField && selfField.hidden) || hidden}
          readOnly={
            (selfField && selfField.readOnly) || readOnly || readOnlyElement
          }
        >
          {label && (
            <Title
              labelWidth={
                (selfField && selfField.labelWidth) || labelWidth || 130
              }
            >
              <div className="title">
                <Switch
                  mobile={<div className="title">{fieldTitle}</div>}
                  computer={
                    <>
                      <div className="title">{fieldTitle}</div>
                      {showLink &&
                        valueRef &&
                        valueRef.current &&
                        valueRef.current.value && <LinkIcon onClick={onLink} />}
                    </>
                  }
                />
              </div>{' '}
              {(error || valueError) && (
                <div className="error">{error || valueError}</div>
              )}
            </Title>
          )}

          <Switch
            mobile={
              <>
                <input
                  ref={inputRef}
                  defaultValue={defaultValue}
                  style={{ display: 'none' }}
                  // type="hidden"
                />
                <MobileView
                  showLink={showLink}
                  title={label}
                  text={mobileText === null ? defaultValue : mobileText}
                  fixedData={selfField.fixedData || fixedData}
                  method={method}
                  renderItem={renderItem || handleRenderItem}
                  readOnly={
                    (selfField && selfField.readOnly) ||
                    readOnly ||
                    readOnlyElement
                  }
                  onLink={onLink}
                  onConfirm={async data => {
                    valueRef.current.value = data ? data[propFieldValue] : null;
                    inputRef.current.value = data ? data[propFieldLabel] : null;
                    setMobileText(inputRef.current.value || '');
                    await handleChange(data);
                  }}
                />
              </>
            }
            computer={
              <PanelInput
                readOnly={
                  readOnly ||
                  readOnlyElement ||
                  selfField.disabled ||
                  selfField.readOnly
                }
              >
                <div>
                  <Input
                    ref={inputRef}
                    defaultValue={defaultValue}
                    hidden={hidden}
                    {...selfField}
                    {...rest}
                    readOnly={
                      (selfField && selfField.readOnly) ||
                      readOnly ||
                      readOnlyElement
                    }
                    onBlur={async e => {
                      const fieldReadOnly =
                        (selfField && selfField.readOnly) ||
                        readOnly ||
                        readOnlyElement;

                      if (!fieldReadOnly) await onBlur(e);
                    }}
                    autoComplete="old"
                    onKeyDown={e => {
                      switch (e.keyCode) {
                        case 27:
                        case 9:
                        case 13:
                        case 20:
                        case 16:
                        case 17:
                        case 18:
                        case 91:
                        case 93:
                        case 37:
                        case 38:
                        case 39:
                          break;

                        case 40: // Seta para baixo
                        case 115: // F4
                          const fieldReadOnly =
                            (selfField && selfField.readOnly) ||
                            readOnly ||
                            readOnlyElement;

                          if (!fieldReadOnly) {
                            if (e.target.changed) {
                              e.target.changed = false;

                              // eslint-disable-next-line eqeqeq
                              if (e.target.value != '')
                                formRef.current.setFieldError(
                                  fieldName,
                                  'Valor inválido'
                                );
                            }

                            setSearchData(null);
                            setSearchText('');
                            setIsShowSearchViewer(true);
                          }
                          break;

                        default:
                          valueRef.current.value = null;
                          e.target.changed = true;
                          break;
                      }
                    }}
                  />
                  {!readOnly &&
                    !readOnlyElement &&
                    !(selfField.disabled || false) &&
                    !(selfField.readOnly || false) &&
                    (isLoading ? (
                      <LoadIcon>
                        <AiOutlineLoading size={12} color="#aaa" />
                      </LoadIcon>
                    ) : (
                      <SearchIcon
                        onClick={() => {
                          setIsShowSearchViewer(true);
                        }}
                      >
                        <FaBars size={12} color="#aaa" />
                      </SearchIcon>
                    ))}
                </div>
                <Modal isOpened={isShowSearchViewer}>
                  {isShowSearchViewer ? (
                    <SearchViewer
                      searchData={searchData}
                      method={method}
                      onClose={() => {
                        setIsShowSearchViewer(false);
                        setIsLoading(false);
                        inputRef.current.focus();
                      }}
                      onConfirm={onSelect}
                      title={label}
                      text={searchText}
                      fixedData={selfField.fixedData || fixedData}
                      renderItem={renderItem || handleRenderItem}
                    />
                  ) : (
                    <></>
                  )}
                </Modal>
              </PanelInput>
            }
          />
        </FieldContainer>

        <UserField
          baseName={baseName}
          fieldName={fieldName}
          formRef={formRef}
          mainFormRef={mainFormRef}
          settings={settings}
          readOnly={readOnly || readOnlyElement}
          labelWidth={(selfField && selfField.labelWidth) || labelWidth || 130}
        />
      </>
    );
  } catch (e) {
    if (renderized.current) {
      console.error(e.message);
    } else {
      console.warn(e.message);
    }
    return null;
  }
}

LinkerElement.prototypes = {
  onChange: PropTypes.func,
  renderItem: PropTypes.func,
  showLink: PropTypes.bool,
  mainFormRef: PropTypes.shape(),
};

LinkerElement.defaultProps = {
  mainFormRef: {},
  onChange: () => {},
  onLinkClick: () => {},
  showLink: false,
};

export default LinkerElement;
