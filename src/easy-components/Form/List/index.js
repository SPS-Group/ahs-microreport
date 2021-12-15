/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-new-func */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { FaPlusCircle, FaEllipsisV } from 'react-icons/fa';
import { useField } from '@unform/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import ModalHandle from '~/easy-components/ModalHandle';
import MenuButton from '~/easy-components/MenuButton';
import { sendData } from '~/store/modules/log/actions';
import QueryService from '~/services/QueryService';
import Detail from './Detail';
import { Container, Item, ErrorInfo, Items } from './styles';
import { fireEvent } from '../sharedFunctions';

const AsyncFunction = new Function(
  `return Object.getPrototypeOf(async function(){}).constructor`
)();

function List({
  name,
  renderItem,
  editPage,
  editPageTitle,
  validate,
  readOnly,
  confirmEnabled,
  settings,
  showAddButton = true,
  defaultData,
  onChange,
  onSelected,
  onValidAddItem,
  title,
  headerItem,
  footerItem,
  menus,
  onOpenMenu,
  onBeforeShow,
  onError,
  itemBackgroundColor,
  enableSelection = true,
  formRef: mainForm,
  footer,
}) {
  const dispatch = useDispatch();

  const { fields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          return f.name === name;
        })
      : {}) || {};

  const formRef = useRef(null);
  const elementRef = useRef(null);
  const containerRef = useRef(null);
  const oldListRef = useRef([]);

  const itemRef = useRef({});
  const selectedIndexRef = useRef(-1);
  const modalRef = useRef(null);

  const [data, setData] = useState([]);
  const [errorList, setErrorList] = useState([]);
  const [lineErrors, setLineErrors] = useState({});
  const [errorDescription, setErrorDescription] = useState('');

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  function onKeydown(e) {
    if (e.keyCode === 27) modalRef.current.handleClose();
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', onKeydown);
    }

    if (selfField.events) {
      selfField.events = selfField.events.map(event => {
        const dynamicFunction = new AsyncFunction('scope', event.handler);
        event.dynamicFunction = dynamicFunction;
        return event;
      });
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeEventListener('keydown', onKeydown);
      }
    };
  }, [dispatch, selfField.events, settings]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: elementRef.current,
      path: 'value',
      clearValue: el => {
        el.value = null;

        setData([]);
        oldListRef.current = [];

        setErrorList([]);
      },
      setValue: async (r, v) => {
        r.value = v;

        setErrorList([]);

        const newList = v ? JSON.parse(v) : [];

        setData(newList);

        const old = JSON.stringify(oldListRef.current);

        if (old !== v && selfField.events) {
          const event = selfField.events.find(
            field => field.name.toUpperCase() === 'ONCHANGE'
          );

          let formData = null;

          if (mainForm.current) formData = mainForm.current.getData();

          if (event)
            await event.dynamicFunction({
              form: mainForm.current,
              element: elementRef.current,
              executeQuery: QueryService.execute,
              executeScalar: async sql => {
                const responseSql = await QueryService.execute(1, sql);
                if (responseSql.length > 0) return responseSql[0];
                return {};
              },
              executeSql: async sql => {
                const responseSql = await QueryService.execute(1, sql);
                return responseSql;
              },
              showError: message => {
                throw new Error(message);
              },
              fireEvent,
              toast,
              formData,
              settings,
              params: {
                oldList: oldListRef.current,
                newList,
              },
            });

          oldListRef.current = newList;
        }
      },
      getValue: () => {
        return data;
      },
    });
  }, [data, fieldName, mainForm, registerField, selfField.events, settings]);

  useEffect(() => {
    if (defaultValue !== '') setData(JSON.parse(defaultValue));
  }, [defaultValue]);

  async function onSelect(line, idx) {
    try {
      const element = idx >= 0 ? { ...data[idx] } : null;
      itemRef.current = element;
      selectedIndexRef.current = idx;
      const lineError = errorList.find(errorLine => +errorLine.line === +idx);
      setLineErrors(lineError || {});
      onSelected(element);
      await onBeforeShow({ data: element, index: idx });
      modalRef.current.handleOpen();
    } catch (e) {
      onError(e);
    }
  }

  function onMouseHover(idx) {
    dispatch(sendData({ name, value: idx }));
  }

  useEffect(() => {
    if (error) {
      if (error.indexOf('[{') >= 0) {
        const list = JSON.parse(error);
        setErrorList(list);
        setErrorDescription('Verifique os erros');
      } else {
        setErrorDescription(error);
      }
    } else {
      setErrorList([]);
    }
  }, [error]);

  const onAdd = async () => {
    if (onValidAddItem({ data, setErrorDescription })) {
      const newData =
        typeof defaultData === 'function'
          ? await defaultData({ pageRef: formRef })
          : defaultData;

      itemRef.current = newData;
      selectedIndexRef.current = -1;

      setLineErrors({});

      modalRef.current.handleOpen();
    }
  };

  if (!Array.isArray(data)) {
    setData([]);
  }

  return (
    <>
      <input
        type="hidden"
        ref={elementRef}
        id={fieldName}
        defaultValue={defaultValue}
      />
      <Container ref={containerRef}>
        <header>
          {title ? <div className="header">{title}</div> : <div />}
          {!readOnly && showAddButton && (
            <div>
              <button type="button" onClick={onAdd}>
                <FaPlusCircle size={24} color="#75b575" />
              </button>

              {menus && menus.length > 0 && (
                <MenuButton
                  menus={menus}
                  onOpen={onOpenMenu}
                  icon={FaEllipsisV}
                  color="#777"
                  size={16}
                  position="bottom right"
                />
              )}
            </div>
          )}
        </header>

        {error && <ErrorInfo>{errorDescription}</ErrorInfo>}
        {headerItem && headerItem()}
        <Items>
          {data &&
            data.map((d, idx) => {
              return (
                <Item
                  backgroundColor={itemBackgroundColor}
                  key={idx}
                  onClick={async () => enableSelection && onSelect(d, idx)}
                  onMouseEnter={() => onMouseHover(idx)}
                  withError={errorList.findIndex(e => +e.line === +idx) >= 0}
                >
                  {renderItem(d, idx, data)}
                </Item>
              );
            })}
        </Items>
        {footerItem && footerItem(data)}
      </Container>
      <ModalHandle ref={modalRef}>
        <Detail
          index={selectedIndexRef.current}
          data={itemRef.current}
          errors={lineErrors}
          readOnly={readOnly}
          validate={validate}
          formRef={formRef}
          onClose={() => {
            modalRef.current.handleClose();
          }}
          onConfirm={async (newData, oldData) => {
            if (selectedIndexRef.current >= 0)
              data[selectedIndexRef.current] = newData;
            else data.push(newData);

            setData(data);
            setLineErrors({});
            modalRef.current.handleClose();

            onChange({
              data,
              setData,
              selectedIndex: selectedIndexRef.current,
              newData,
              oldData,
            });
          }}
          confirmEnabled={confirmEnabled}
          editPage={editPage}
          editPageTitle={editPageTitle}
          settings={settings}
          footerElement={footer}
        />
      </ModalHandle>
    </>
  );
}

List.propTypes = {
  name: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  editPage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  editPageTitle: PropTypes.string.isRequired,
  validate: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  confirmEnabled: PropTypes.bool,
  settings: PropTypes.oneOfType([
    PropTypes.shape,
    PropTypes.func,
    PropTypes.any,
  ]),
  showAddButton: PropTypes.bool,
  defaultData: PropTypes.oneOfType([PropTypes.shape, PropTypes.func]),
  onChange: PropTypes.func,
  title: PropTypes.string,
  headerItem: PropTypes.func,
  footerItem: PropTypes.func,
  menus: PropTypes.arrayOf(PropTypes.shape()),
  onOpenMenu: PropTypes.func,
  onValidAddItem: PropTypes.func,
  onSelected: PropTypes.func,
  onBeforeShow: PropTypes.func,
  onError: PropTypes.func,
  formRef: PropTypes.shape(),
};

List.defaultProps = {
  defaultData: null,
  showAddButton: true,
  validate: () => true,
  onChange: () => {},
  settings: null,
  confirmEnabled: true,
  title: null,
  headerItem: null,
  footerItem: null,
  menus: [],
  onOpenMenu: null,
  onValidAddItem: () => true,
  onSelected: () => {},
  onBeforeShow: () => {},
  onError: error => {
    console.error(error);
  },
  formRef: {},
  footer: () => {
    return null;
  },
};

export default memo(List);
