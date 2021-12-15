/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Input from '../../Input';
import Number from '../../Number';
import Linker from '../../Linker';
import Tag from '../../Tag';
import QueryField from '../../QueryField';
import DateField from '../../DateField';
import Display from '../../Display';
import Attachment from '../../Attachment';

function Field({ baseName, target, formRef, mainFormRef, settings, readOnly }) {
  const [data, setData] = useState([]);
  const [componentType, setComponentType] = useState(null);
  const [fieldDefault, setFieldDefault] = useState({});

  const [label, setLabel] = useState(' ');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadData = ({ info }) => {
    if (info && info.length > 0) {
      const {
        fieldLabel,
        defaultValue,
        fieldType,
        editType,
        validationType,
      } = info[0];

      setLabel(fieldLabel);
      setFieldDefault(defaultValue);

      switch (validationType) {
        case 'ValidValues':
          setComponentType('Combo');
          // eslint-disable-next-line no-case-declarations
          const listItems = info.map(line => ({
            value: line.value,
            label: line.label,
          }));

          setData(listItems);
          break;

        case 'None':
          switch (fieldType) {
            case 'B':
              switch (editType) {
                case 'P':
                  setComponentType('Price');
                  break;

                case 'Q':
                  setComponentType('Quantity');
                  break;

                case '%':
                  setComponentType('Percent');
                  break;

                case 'R':
                  setComponentType('Rate');
                  break;

                case 'S':
                  setComponentType('Value');
                  break;

                case 'M':
                  setComponentType('Measury');
                  break;

                default:
                  break;
              }
              break;

            case 'N':
              setComponentType('Number');
              break;

            case 'D':
              setComponentType('Date');
              break;

            default:
              setComponentType('Text');
              break;
          }
          break;

        default:
          setComponentType('NotFound');
          setFieldDefault(null);
          break;
      }
    } else {
      setComponentType('NotFound');
      setLabel('?Não identificado');
      setFieldDefault(null);
    }
  };

  useEffect(() => {
    const type = target.type || 'userField';

    switch (type) {
      case 'userField':
        loadData({ info: settings.userFieldsInfo[target.name.substring(2)] });
        break;

      default:
        setComponentType(type);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getField() {
    if (label && componentType) {
      const value =
        target.value === undefined ? `${target.name}` : target.value;

      const name = target.value === undefined ? `_${target.name}` : target.name;

      switch (componentType.toUpperCase()) {
        case 'COMBO':
          // eslint-disable-next-line no-case-declarations
          const fixedData = target.data || data || [];
          return (
            <>
              {fixedData.length > 0 ? (
                <Linker
                  baseName={baseName}
                  label={target.title || target.label || label || ' '}
                  labelWidth={target.labelWidth}
                  name={`${target.name}`}
                  valueField={`${target.name}`}
                  settings={settings}
                  formRef={formRef}
                  mainFormRef={mainFormRef}
                  readOnly={readOnly}
                  fixedData={fixedData}
                  fieldDefaultValue={fieldDefault}
                />
              ) : null}
            </>
          );

        case 'DATE':
          return (
            <DateField
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              returnFormat={target.returnFormat}
              // fieldDefaultValue={fieldDefault}
            />
          );

        case 'NUMBER':
          return (
            <Number
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'INTEGER':
          return (
            <Number
              decimalLength={0}
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'QUANTITY':
          return (
            <Number
              decimalLength={2}
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'MEASURE':
          return (
            <Number
              decimalLength={2}
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'PRICE':
          return (
            <Number
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              symbol="R$"
              decimalLength={2}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'PERCENT':
          return (
            <Number
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              symbol="%"
              decimalLength={6}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'RATE':
          return (
            <Number
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              symbol=""
              decimalLength={4}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'VALUE':
          return (
            <Number
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              symbol=""
              decimalLength={2}
              fieldDefaultValue={fieldDefault}
            />
          );

        case 'QUERYFIELD':
          return (
            <QueryField
              baseName={baseName}
              label={target.title || target.label || ' '}
              labelWidth={target.labelWidth}
              name={name}
              valueField={value}
              settings={settings}
              formRef={formRef}
              mainFormRef={mainFormRef}
              readOnly={readOnly}
              sql={target.sql}
            />
          );

        case 'TAG':
          return (
            <Tag
              baseName={baseName}
              label={target.title || target.label || ' '}
              labelWidth={target.labelWidth}
              name={target.name}
              settings={settings}
              formRef={formRef}
              mainFormRef={mainFormRef}
              readOnly={readOnly}
              sql={target.sql}
              fixedData={target.fixedData}
              separator={target.separator}
            />
          );

        case 'FIXEDDATA':
          return (
            <Linker
              baseName={baseName}
              label={target.title || target.label || ' '}
              labelWidth={target.labelWidth}
              name={value}
              valueField={value}
              settings={settings}
              formRef={formRef}
              fixedData={target.data || []}
              mainFormRef={mainFormRef}
              readOnly={readOnly}
            />
          );

        case 'DISPLAY':
          return (
            <Display
              baseName={baseName}
              label={target.title || target.label || label || ''}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefault={fieldDefault}
            />
          );

        case 'ATTACHMENT':
          return (
            <Attachment
              baseName={baseName}
              label={target.title || target.label || label || ''}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefault={fieldDefault}
            />
          );
        default:
          return (
            <Input
              baseName={baseName}
              label={target.title || target.label || label || ' '}
              labelWidth={target.labelWidth}
              name={`${target.name}`}
              formRef={formRef}
              mainFormRef={mainFormRef}
              settings={settings}
              readOnly={readOnly}
              fieldDefaultValue={fieldDefault}
            />
          );
      }
    }

    return (
      <Input
        baseName={baseName}
        label={label || ' '}
        labelWidth={target.labelWidth}
        name={`${target.name}`}
        formRef={formRef}
        mainFormRef={mainFormRef}
        settings={settings}
        readOnly={readOnly}
        fieldDefaultValue=""
      />
    );
  }

  return getField();
}

export default Field;
