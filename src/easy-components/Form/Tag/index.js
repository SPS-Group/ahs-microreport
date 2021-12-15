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
import { FaPlus } from 'react-icons/fa';
import QueryService from '../../../services/QueryService';

import Modal from '../../Modal';
import Switch from '../../Switch';
import TreatError from '../../TreatError';
import SelectItem from '../../SelectItem';
import { sendEvent } from '../../HandlerEvent';
import UserField from '../UserField';
import { FieldContainer, Title } from '../styles';

import { PanelInput, SearchIcon } from './styles';
import MobileView from './MobileView';
import SearchViewer from './MobileView/Detail';
import Elements from './Elements';
import useStateCache from '~/hooks/useStateCache';

import { sendData } from '~/store/modules/log/actions';

function TagElement({
  baseName,
  name: valueField,
  label,
  hidden,
  formRef,
  mainFormRef,
  settings,
  labelWidth,
  readOnly,
  method: clientMethod,
  sql,
  onChange,
  fixedData,
  fieldDefaultValue,
  propFieldValue = 'value',
  propFieldLabel = 'label',
  renderItem,
  separator = ',',
}) {
  const dispatch = useDispatch();

  const [isShowSearchViewer, setIsShowSearchViewer] = useState(false);
  const showLog = useSelector(({ log }) => log.isShow);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues, getSelectedValues] = useStateCache(
    []
  );

  const { fields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          const fullName = baseName ? `${baseName}.${valueField}` : valueField;
          return f.name === fullName;
        })
      : {}) || {};

  const valueRef = useRef(null);

  const fieldTitle = selfField.title || label;

  const {
    fieldName: valueFieldName,
    defaultValue: valueDefaultValue = fieldDefaultValue || null,
    registerField: valueRegisterField,
    error,
  } = useField(valueField);

  useEffect(() => {
    valueRegisterField({
      name: valueFieldName,
      ref: valueRef.current,
      path: 'value',
      setValue: (el, v) => {
        const textValue = v === '' ? null : v;
        const splitted =
          textValue !== null && textValue !== undefined
            ? textValue.split(separator)
            : null;
        setSelectedValues(splitted || []);

        el.value = textValue;
      },
      getValue: () => {
        const values = getSelectedValues().join(separator);
        return values;
      },
    });
  }, [valueFieldName, valueRegisterField]);

  useEffect(() => {
    if (fixedData) {
      setOptions(fixedData);
    } else if (sql) {
      QueryService.execute(1, sql).then(response => {
        setOptions(response);
      });
    } else {
      method().then(response => {
        setOptions(response);
      });
    }
  }, []);

  function handleRenderItem(data, selected) {
    return (
      <SelectItem
        isShowSelection
        auxInfo={data.auxInfo || data.AuxInfo}
        header={data[propFieldLabel]}
        selected={selected}
      />
    );
  }

  const handlerEvent = async (eventName, params, run) => {
    const response = await sendEvent({
      settings,
      eventName,
      params,
      run,
      formRef,
      mainFormRef,
      element: valueRef.current,
      events: selfField.events,
    });

    return response || params;
  };

  async function handleChange(data) {
    try {
      const newValue = await handlerEvent('onchange', data, 'before');

      await onChange(newValue, valueRef);

      await handlerEvent('onchange', newValue, 'after');

      setSelectedValues(newValue);
    } catch (e) {
      TreatError.showError(e);
    }
  }

  async function onSelect(data) {
    setIsShowSearchViewer(false);
    handleChange(data);
  }

  async function method(props) {
    const clientResponse = await clientMethod(props);
    return clientResponse;
  }

  function onRemove(value) {
    const newSelectedValues = selectedValues.filter(opt => opt !== value);
    setSelectedValues(newSelectedValues);
    onChange({ list: newSelectedValues, data: null });
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
          readOnly={(selfField && selfField.readOnly) || readOnly}
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
                    </>
                  }
                />
              </div>{' '}
              {error && <div className="error">{error}</div>}
            </Title>
          )}

          <Switch
            mobile={
              <>
                <MobileView
                  title={label}
                  text=""
                  fixedData={options}
                  method={null}
                  renderItem={renderItem || handleRenderItem}
                  readOnly={(selfField && selfField.readOnly) || readOnly}
                  propFieldLabel={propFieldLabel}
                  propFieldValue={propFieldValue}
                  selValues={selectedValues}
                  onConfirm={async data => {
                    await handleChange(data);
                  }}
                >
                  <Elements
                    dispatch={dispatch}
                    baseName={baseName}
                    onRemove={onRemove}
                    options={options}
                    propFieldValue={propFieldValue}
                    readOnly={readOnly}
                    selectedValues={selectedValues}
                    sendData={sendData}
                    separator={separator}
                    showLog={showLog}
                    valueFieldName={valueFieldName}
                  />
                </MobileView>
              </>
            }
            computer={
              <PanelInput
                readOnly={readOnly || selfField.disabled || selfField.readOnly}
              >
                <div>
                  <Elements
                    dispatch={dispatch}
                    baseName={baseName}
                    onRemove={onRemove}
                    options={options}
                    propFieldLabel={propFieldLabel}
                    propFieldValue={propFieldValue}
                    readOnly={readOnly}
                    selectedValues={selectedValues}
                    sendData={sendData}
                    separator={separator}
                    showLog={showLog}
                    valueFieldName={valueFieldName}
                  />
                  {!readOnly &&
                    !(selfField.disabled || false) &&
                    !(selfField.readOnly || false) && (
                      <SearchIcon
                        onClick={() => {
                          setIsShowSearchViewer(true);
                        }}
                      >
                        <FaPlus size={12} color="#aaaaaa" />
                      </SearchIcon>
                    )}
                </div>
                <Modal isOpened={isShowSearchViewer}>
                  {isShowSearchViewer ? (
                    <SearchViewer
                      propFieldLabel={propFieldLabel}
                      propFieldValue={propFieldValue}
                      selValues={selectedValues}
                      onClose={() => {
                        setIsShowSearchViewer(false);
                      }}
                      onConfirm={onSelect}
                      title={label}
                      text=""
                      fixedData={options}
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
          fieldName={valueFieldName}
          formRef={formRef}
          mainFormRef={mainFormRef}
          settings={settings}
          readOnly={readOnly}
          labelWidth={(selfField && selfField.labelWidth) || labelWidth || 130}
        />
      </>
    );
  } catch (e) {
    console.error(e.message);
    return null;
  }
}

TagElement.prototypes = {
  onChange: PropTypes.func,
  renderItem: PropTypes.func,
  mainFormRef: PropTypes.shape(),
};

TagElement.defaultProps = {
  mainFormRef: {},
  onChange: () => {},
};

export default TagElement;
