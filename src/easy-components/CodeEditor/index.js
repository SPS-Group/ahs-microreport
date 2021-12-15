/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';

import ResizablePanels from 'resizable-panels-react';
import ReactTooltip from 'react-tooltip';

import {
  FiMaximize2 as ExpandIcon,
  FiMinimize as MinimizeIcon,
  FiPlay as Play,
} from 'react-icons/fi';
import { MdFormatIndentIncrease } from 'react-icons/md';
import { VscClearAll as ClearIcon } from 'react-icons/vsc';
import { GoTerminal as Terminal } from 'react-icons/go';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import QueryService from '~/services/QueryService';
import { Loading } from '~/easy-components';
import colors from '~/styles/colors';
import {
  Container,
  Toolbar,
  EditorContent,
  Component,
  SqlConsole,
} from './styles';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-javascript';

require('prismjs/components/prism-jsx');

function CodeEditor(
  {
    title,
    value,
    onChange,
    editorType,
    onCtrlS,
    buttons,
    readOnly,
    onBeforeExecute,
    onExecute,
  },
  ref
) {
  const elementRef = ref;

  const inputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isShowSqlConsole, setIsShowSqlConsole] = useState(false);
  const [sqlResult, setSqlResult] = useState([]);

  function onKeyDown(event) {
    const char_S = 83;
    const char_E = 69;
    const char_ESC = 27;
    const char_R = 82;

    const input = inputRef.current._input;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (event.ctrlKey) {
      switch (event.keyCode) {
        case char_S:
          event.stopPropagation();
          event.preventDefault();

          if (onCtrlS) {
            onCtrlS(value);
            setFocus(start, end);
          }
          break;

        case char_E:
          if (editorType === 'sql') {
            event.stopPropagation();
            event.preventDefault();
            executeSql(value);
            setIsShowSqlConsole(true);
            setFocus(start, end);
          }
          break;

        case char_R:
          if (editorType === 'sql') {
            event.stopPropagation();
            event.preventDefault();

            setIsShowSqlConsole(!isShowSqlConsole);
            setFocus(start, end);
          }
          break;

        default:
          break;
      }
    }

    switch (event.keyCode) {
      case char_ESC:
        setExpanded(!isExpanded);
        setFocus(start, end);
        break;

      default:
        break;
    }
  }

  function setFocus(start, end) {
    setTimeout(() => {
      const input = inputRef.current._input;
      input.focus();
      // if (start !== end) {
      input.setSelectionRange(start, end);
    }, 300);
  }

  async function execute(sql, dataToReplace) {
    try {
      setSqlResult([]);

      const response = await QueryService.execute(1, sql, dataToReplace);

      setSqlResult(response);

      setIsShowSqlConsole(true);
    } catch (error) {
      setSqlResult({ error });
      setIsShowSqlConsole(true);
    }
  }

  async function executeSql() {
    const input = inputRef.current._input;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    try {
      setIsLoading(true);

      const queryField = input.value;

      let sql = queryField;

      if (start !== end) sql = queryField.substring(start, end);

      const parameters = sql.match(/<[^>]+>/g);

      // TODO: Exibir o painel para preenchimento de valores caso exista parametros na consulta


      // const token = await ApplicationGroupService.getToken(selectedItem);
      // const response = await QueryService.execute(selectedItem, sql);

      if (!sql) {
        input.focus();
        input.setSelectionRange(start, end);
        setSqlResult(null);
        return null;
      }

      if (onBeforeExecute) sql = await onBeforeExecute(sql);

      if (onExecute) {
        await onExecute({ executeSql: execute, sql });
      } else {
        await execute(sql);
      }
    } catch (error) {
      setSqlResult({ error });
      setIsShowSqlConsole(true);
    } finally {
      setIsLoading(false);

      input.focus();
      input.setSelectionRange(start, end);
    }
  }

  function getColumns(row) {
    const columns = [];

    Object.keys(row).forEach(prop => {
      columns.push(prop);
    });

    return columns;
  }

  function renderTable(data) {
    if (isLoading) {
      return <div style={{ padding: 10, color: '#99e1ff' }}>Executando...</div>;
    }
    if (data.error) {
      let { message } = data.error;

      if (data.error.response) {
        if (data.error.response.data) {
          if (data.error.response.data.error) {
            if (data.error.response.data.error.originalError) {
              message = data.error.response.data.error.originalError.message;
            } else {
              message = data.error.response.data.error;
            }
          }
        }
      }

      return <div style={{ padding: 10, color: '#ff9999' }}>{message}</div>;
    }

    if (!data || data.length === 0) {
      return <div style={{ padding: 10 }}>Nenhum resultado encontrado</div>;
    }
    const headers = [];

    Object.keys(data[0]).forEach(prop => {
      headers.push(prop);
    });

    return (
      <table>
        <thead>
          <tr>
            {headers.map((column, i) => (
              <th key={i}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            return (
              <tr key={i}>
                {getColumns(row).map((cell, idx) => {
                  return <td key={idx}>{row[cell]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  useImperativeHandle(elementRef, () => {
    return {
      input: inputRef.current._input,
      getValue: () => inputRef.current._input.value,
      showConsole: setIsShowSqlConsole,
    };
  });

  return (
    <Component isExpanded={isExpanded}>
      <Loading isLoading={isLoading} />
      <Toolbar>
        <h1>{title}</h1>
        <section>
          {editorType === 'sql' && !readOnly && (
            <>
              <div
                data-tip="Executar"
                data-for="toolbarTooltipCodeEditor"
                onClick={async () => {
                  await executeSql();
                }}
              >
                <Play size={20} color={colors.mainMenuIcons} />
              </div>
              <div
                data-tip="Painel"
                data-for="toolbarTooltipCodeEditor"
                onClick={() => setIsShowSqlConsole(!isShowSqlConsole)}
              >
                <Terminal size={24} color={colors.mainMenuIcons} />
              </div>
            </>
          )}
          {buttons &&
            buttons.map(button => {
              /* if (button.props.onlyExpanded) {
              return isExpanded ? button : null;
            } */
              return button;
            })}
          {editorType === 'json' && !readOnly && (
            <div
              key="format"
              onClick={async () => {
                const rawValue = inputRef.current._input.value;
                const objectValue = JSON.parse(rawValue);

                const jsonValue = JSON.stringify(objectValue, null, 4);

                inputRef.current._input.value = jsonValue;

                onChange(jsonValue);
              }}
            >
              <div data-tip="Formatação" data-for="toolbarTooltipCodeEditor">
                <MdFormatIndentIncrease
                  size={24}
                  color={colors.mainMenuIcons}
                />
              </div>
            </div>
          )}
          {!readOnly && (
            <div>
              <ClearIcon
                data-tip="Limpar"
                data-for="toolbarTooltipCodeEditor"
                onClick={() => {
                  inputRef.current._input.value = '';
                  onChange('');
                  inputRef.current._input.focus();
                }}
                size={24}
                color={colors.mainMenuIcons}
              />
            </div>
          )}
          <div
            onClick={() => {
              setExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <div data-tip="Minimizar" data-for="toolbarTooltipCodeEditor">
                <MinimizeIcon size={24} color={colors.mainMenuIcons} />
              </div>
            ) : (
              <div data-tip="Maximizar" data-for="toolbarTooltipCodeEditor">
                <ExpandIcon size={18} color={colors.mainMenuIcons} />
              </div>
            )}
          </div>
        </section>
      </Toolbar>
      <section>
        {isShowSqlConsole ? (
          <ResizablePanels
            displayDirection="column"
            width="100%"
            height="100%"
            panelsSize={[70, 30]}
            sizeUnitMeasure="%"
            resizerColor="#555"
            resizerSize="5px"
          >
            <Container onClick={() => inputRef.current._input.focus()}>
              <EditorContent onKeyDown={onKeyDown}>
                <Editor
                  readOnly={readOnly}
                  ref={inputRef}
                  tabSize={4}
                  insertSpaces
                  value={value || ''}
                  onValueChange={onChange}
                  highlight={code => highlight(code, languages[editorType])}
                  padding={10}
                  className="editor"
                />
              </EditorContent>
            </Container>

            {editorType === 'sql' && isShowSqlConsole && (
              <SqlConsole>{renderTable(sqlResult)}</SqlConsole>
            )}
          </ResizablePanels>
        ) : (
          <>
            <Container
              onClick={() => inputRef.current._input.focus()}
              className={readOnly ? 'readonly' : ''}
            >
              <EditorContent onKeyDown={onKeyDown}>
                <Editor
                  readOnly={readOnly}
                  ref={inputRef}
                  tabSize={4}
                  insertSpaces
                  value={value || ''}
                  onValueChange={onChange}
                  highlight={code => highlight(code, languages[editorType])}
                  padding={10}
                  className={`editor ${readOnly && 'readonly'}`}
                />
              </EditorContent>
            </Container>
            {editorType === 'sql' && isShowSqlConsole && (
              <SqlConsole>{renderTable(sqlResult)}</SqlConsole>
            )}
          </>
        )}
      </section>

      <ReactTooltip
        id="toolbarTooltipCodeEditor"
        place="bottom"
        type="light"
        effect="solid"
        className="toolbarTooltip"
      />
    </Component>
  );
}

export default forwardRef(CodeEditor);
