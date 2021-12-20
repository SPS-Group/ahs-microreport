/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable new-cap */
/* eslint-disable no-new-func */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { isMobile } from 'react-device-detect';

import {
  search,
  selectRow,
  selectSingleRow,
  deselectAllRows,
  selectAllFilteredRows,
  deselectAllFilteredRows,
  updateCellValue,
  deselectRow,
} from 'ka-table/actionCreators';

import { toDate, isEqual, format } from 'date-fns';
import { Decimal } from 'decimal.js';
import { kaPropsUtils } from 'ka-table/utils';
import { getValueByColumn } from 'ka-table/Utils/DataUtils';
import { kaReducer, Table } from 'ka-table';
import { SortingMode, FilteringMode } from 'ka-table/enums';
import {
  RiFileExcel2Line as ExcelIcon,
  RiRefreshLine as ReloadIcon,
} from 'react-icons/ri';
import { GrDocumentPdf as PdfIcon } from 'react-icons/gr';
import {
  SwipeableList,
  SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';

import {
  Container,
  Content,
  Toolbar,
  FooterBar,
  SearchMobileInput,
  Resume,
} from './styles';
import DateFilter from './Filters/DateFilter';
import TextFilter from './Filters/TextFilter';
import NumberFilter from './Filters/NumberFilter';
import SwipeButton from './SwipeButton';
import SwipeModalButtons from './SwipeModalButtons';
import Card from './Card';
import { Container as ResposiveContainer } from './responsiveContainer';
import dynamicFunction from './dynamicFunction';
import ModalDetail from './ModalDetail';
import getCellText from './Helpers/getCellText';
import getFormatCellText from './Helpers/getFormatCellText';
import { createSyncFunctionByString } from '../AsyncFunctionString';
import PromptModal from '~/easy-components/PromptModal';
import Button from '~/easy-components/Button';
import Form from '~/easy-components/Form';
import GroupBy from './GroupBy';
import SelectionCell from './CustomCells/SelectionCell';
import { VALIDATE_AND_SELECT_TYPE } from './CustomActions/validateAndSelectRow';
import AutoRefresh from './AutoRefresh';

export const PageContext = createContext();

const JsonTable = (
  {
    title,
    fileName,
    subTitle,
    data,
    columns,
    pdfFontSize = 7,
    pdfOrientation = 'portrait',
    groups = [],
    settings,
    reportSettings = {},
    onRefresh,
    showLoading,
    onSelect,
    hideToolbar = false,
    hasFilter = true,
    isMultSelection = true,
    paramsModal,
    scopes = {},
    onReloadData = () => {},
  },
  ref
) => {
  const modalSwipeButtonsRef = useRef();
  const modalDetailButtonsRef = useRef();
  const modalDetailRef = useRef();
  const promptRef = useRef();
  const formRef = useRef();
  const autoRefreshRef = useRef();

  const rowDataRef = useRef();

  const [groupBy, setGroupBy] = useState(null);

  const SelectionHeader = ({ dispatch, areAllRowsSelected }) => (
    <SelectionCell
      value="S"
      isSelectedRow={areAllRowsSelected}
      onClick={() => {
        if (!areAllRowsSelected) {
          dispatch(selectAllFilteredRows());
        } else {
          dispatch(deselectAllFilteredRows());
        }
      }}
    />
  );

  const columnsWithSettings = columns.map((c) => {
    const settingsFounded = reportSettings.columns
      ? reportSettings.columns.find(
          (columnSettings) => columnSettings.name === c.key
        )
      : undefined;
    return { ...c, settings: { ...c.settings, ...settingsFounded } };
  });

  const columnsOnSettings = reportSettings.columns
    ? [...reportSettings.columns]
        .filter(
          (columnSettings) =>
            ![...columns].filter(
              (columnFromProps) => columnFromProps.key === columnSettings.name
            ).length
        )
        .map((c) => ({ key: c.name, title: c.title, settings: { ...c } }))
    : undefined;

  const columnsTreated = [...columnsWithSettings, ...columnsOnSettings];

  const [tableProps, changeTableProps] = useState({
    columns: columnsTreated,
    data,
    rowKeyField: reportSettings.rowKeyField || '_key',
    selectedRows: reportSettings.selectedRows || [],
    filteringMode: hasFilter ? FilteringMode.FilterRow : null,
    sortingMode: SortingMode.Single,
  });

  const dispatch = async (action) => {
    switch (action.type) {
      case VALIDATE_AND_SELECT_TYPE: {
        const { cellProps, rowData, value, rowKeyValue, forceSelection } =
          action.payload;
        const selectionColumns = columnsTreated.filter(
          (c) => c.settings.type === 'selection'
        );
        const selectionColumnExists = !!selectionColumns.length;

        const selectionColumn = selectionColumnExists
          ? selectionColumns[0]
          : {};

        let allowCheck = true;

        if (selectionColumn.settings && selectionColumn.settings.onValidate) {
          const isValid = await dynamicFunction({
            functionString: selectionColumn.settings.onValidate,
            dispatch,
            settings,
            promptRef,
            params: {
              isChecking: forceSelection || !cellProps.isSelectedRow,
              column: selectionColumn,
              line: rowData,
              value,
              rowKeyValue,
              refresh: onRefresh,
              getSelectedData: () => kaPropsUtils.getSelectedData(tableProps),
              setFieldValue: (columnKey, newValue) => {
                dispatch(updateCellValue(rowKeyValue, columnKey, newValue));
              },
            },
          });

          if (isValid === false) {
            allowCheck = false;
          }
        }

        if (allowCheck) {
          if (cellProps.isSelectedRow && !forceSelection) {
            dispatch(deselectRow(rowKeyValue));
          } else {
            dispatch(selectRow(rowKeyValue));
          }
        } else {
          dispatch(deselectRow(rowKeyValue));
        }

        break;
      }

      default: {
        changeTableProps((prevState) => kaReducer(prevState, action));
        break;
      }
    }
  };

  useImperativeHandle(ref, () => ({
    changeData: (newData) => {
      changeTableProps({ ...tableProps, data: newData });
    },
    changeTableProps,
    getSelectedData: () => kaPropsUtils.getSelectedData(tableProps),
    clearSelections: () => {
      dispatch(deselectAllRows());
    },
    getData: () => tableProps.data,

    selectRow: (rowKeyValue) => {
      changeTableProps(kaReducer(tableProps, selectRow(rowKeyValue)));
    },
  }));

  const cardTemplateFields = useMemo(() => {
    if (reportSettings.mobileCardTemplate) {
      let fields = reportSettings.mobileCardTemplate.match(/{[^}]+}/g);

      if (fields) {
        fields = fields.map((field) => {
          const prop = field.split('{').join('').split('}').join('');

          const column =
            tableProps.columns.find((col) => col.key === prop) || {};

          if (!column.settings) {
            column.settings = {};
          }

          const formatter = getFormatCellText({ column });

          return {
            prop,
            column,
            formatter,
          };
        });
      }
      return fields || [];
    }
    return null;
  }, [reportSettings.mobileCardTemplate, tableProps.columns]);

  const getRowColor = useMemo(() => {
    if (reportSettings.rowColor) {
      const dynamic = createSyncFunctionByString({
        functionString: reportSettings.rowColor,
      });
      return dynamic;
    }
    return null;
  }, [reportSettings.rowColor]);

  const getCellStyleFunction = useCallback((stringFunction) => {
    if (stringFunction) {
      const dynamic = createSyncFunctionByString({
        functionString: stringFunction,
      });
      return dynamic;
    }
    return null;
  }, []);

  const filterByDeviceType = (cols) => {
    const devicePropHidden = isMobile ? 'hiddenMobile' : 'hiddenDesktop';

    const deviceColumns = cols.filter((col) => {
      if (!col.settings) {
        col.settings = {};
      }

      if (!col.settings[devicePropHidden]) {
        col.settings[devicePropHidden] = false;
      }

      return !col.settings[devicePropHidden];
    });

    return deviceColumns;
  };

  const verifyHasInput = (cols) => {
    let status = false;
    cols.forEach((col) => {
      if (col.settings && col.settings.type) {
        if (
          col.settings.type === 'inputText' ||
          col.settings.type === 'inputNumber'
        ) {
          status = true;
        }
      }
    });

    return status;
  };

  const loadData = (isGrouped = true) => {
    const resultGroups = isGrouped
      ? groups.map((group) => ({
          columnKey: group,
        }))
      : [];

    const filteredColumns = filterByDeviceType(columnsTreated);

    const hasInput = verifyHasInput(columnsTreated);

    if (resultGroups.length > 0) {
      const col = filteredColumns.find(
        (column) => column.key === resultGroups[0].columnKey
      );
      if (col) {
        setGroupBy({
          value: col.key,
          label: col.title,
        });
      }
    }

    changeTableProps({
      columns: filteredColumns.map((col) => ({ ...col, width: 500 })),
      data,
      groups: resultGroups.length > 0 ? resultGroups : null,
      virtualScrolling: hasInput
        ? {
            enabled: true, // renderiza apenas as linhas visiveis
          }
        : {},
      filteringMode: hasFilter ? FilteringMode.FilterRow : null,
      sortingMode: SortingMode.Single,
      rowKeyField: reportSettings.rowKeyField || '_key',
      selectedRows: reportSettings.selectedRows || [],
      filter: ({ column }) => {
        switch (column.dataType) {
          case 'date':
            return (value, filterRowValue) => {
              try {
                const dateValue = toDate(value);
                const filterDateValue = toDate(filterRowValue);
                const dateIsEqual = isEqual(dateValue, filterDateValue);

                return dateIsEqual;
              } catch (error) {
                return false;
              }
            };

          case 'number':
            return (value, filterRowValue) => {
              try {
                const filterValue = new Decimal(filterRowValue);
                return filterValue.equals(value);
              } catch (error) {
                return false;
              }
            };

          default:
            break;
        }
      },
    });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, columns]);

  const exportClick = (orientation) => {
    const doc = new jsPDF(orientation);

    const head = [
      tableProps.columns
        .filter((c) => {
          if (c.settings && c.settings.type === 'button') {
            return false;
          }

          return true;
        })
        .map((c) => c.title),
    ];

    const body =
      tableProps.data &&
      tableProps.data.map((d) =>
        tableProps.columns.map((c) => getValueByColumn(d, c))
      );

    doc.setFontSize(12);
    doc.text(title, 10, 10);

    doc.setFontSize(8);
    doc.setTextColor('#777');
    doc.text(subTitle, 10, 15);

    doc.setFontSize(7);
    doc.setTextColor('#777');
    const date = new Date();
    doc.text(format(date, 'dd/MM/yyyy HH:mm'), 10, 18.5);

    doc.autoTable({
      styles: { fontSize: pdfFontSize },
      margin: {
        top: 22,
        left: 10,
        right: 10,
        bottom: 10,
      },
      headStyles: {
        fillColor: '#F1F5F7',
        textColor: '#747D86',
      },
      alternateRowStyles: { fillColor: '#F9FBFC' },
      head,
      body,
    });

    doc.save(`${fileName}.pdf`);
  };

  function swipeButtonsSettings({ rowData }) {
    const buttons = tableProps.columns.filter((c) => {
      if (c.settings && c.settings.type === 'button') {
        return true;
      }

      return false;
    });

    const leftButtons = [];
    const rightButtons = [];

    buttons.forEach((button) => {
      const onClickFunction = async () => {
        const column = tableProps.columns.find(
          (col) => col.key === button.settings.name
        );

        await dynamicFunction({
          dispatch,
          functionString: button.settings.onClick,
          settings,
          promptRef,
          params: {
            column,
            line: rowData,
            value: rowData[button.settings.name],
            refresh: onRefresh,
            showLoading,
            paramsModal,
          },
        });
      };

      const swipeButton = {
        content: (
          <SwipeButton
            settings={button.settings}
            onClick={async () => {
              await onClickFunction();

              if (
                modalSwipeButtonsRef.current &&
                modalSwipeButtonsRef.current.close
              ) {
                modalSwipeButtonsRef.current.close();
              }

              if (modalDetailRef.current && modalDetailRef.current.close) {
                modalDetailRef.current.close();
              }
            }}
          />
        ),
        action: async () => {
          await onClickFunction();
        },
      };

      const status = rowData[button.settings.name];

      if (status !== 'N' && status !== 'H' && status !== null) {
        if (!button.settings.swipe) {
          button.settings.swipe = {
            direction: 'right',
            icon: 'HiOutlineDocument',
          };
        }
        if (
          button.settings.swipe.direction === 'right' ||
          button.settings.swipe.direction == null
        ) {
          rightButtons.push(swipeButton);
        } else {
          leftButtons.push(swipeButton);
        }
      }
    });

    const swipeLeftMore = {
      content: (
        <SwipeButton
          settings={{
            title: 'Menu',
            swipe: {
              direction: 'left',
              icon: 'FaEllipsisV',
              iconColor: '#fff',
              backgroundColor: '#449dc1',
              color: '#fff',
            },
          }}
        />
      ),
      action: () => {
        rowDataRef.current = rowData;
        modalSwipeButtonsRef.current.open({ buttons: leftButtons });
      },
    };

    const swipeRightMore = {
      content: (
        <SwipeButton
          settings={{
            title: 'Menu',
            swipe: {
              direction: 'right',
              icon: 'FaEllipsisV',
              iconColor: '#fff',
              backgroundColor: '#449dc1',
              color: '#fff',
            },
          }}
        />
      ),
      action: () => {
        rowDataRef.current = rowData;
        modalSwipeButtonsRef.current.open({ buttons: rightButtons });
      },
    };

    let swipeLeft = null;

    switch (leftButtons.length) {
      case 0:
        swipeLeft = null;
        break;

      case 1:
        swipeLeft = leftButtons[0];
        break;

      default:
        swipeLeft = swipeLeftMore;
        break;
    }

    let swipeRight = null;

    switch (rightButtons.length) {
      case 0:
        swipeRight = null;
        break;

      case 1:
        swipeRight = rightButtons[0];
        break;

      default:
        swipeRight = swipeRightMore;
        break;
    }

    return {
      swipeLeft,
      swipeRight,
      leftButtons,
      rightButtons,
    };
  }

  const footerButtons = reportSettings.footerButtons || [];

  const optionsGroup = useMemo(() => {
    if (
      reportSettings.optionsGroup &&
      reportSettings.optionsGroup.length > 0 &&
      tableProps.columns
    ) {
      const options = reportSettings.optionsGroup.map((group) => {
        const column = tableProps.columns.find((col) => col.key === group);
        return {
          value: group,
          label: column ? column.title : group,
        };
      });

      return options;
    }

    return null;
  }, [reportSettings.optionsGroup, tableProps.columns]);

  return (
    <PageContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        swipeButtonsSettings,
        modalDetailButtonsRef,
        modalDetailRef,
        promptRef,
        dispatch,
        paramsModal,
      }}
    >
      <div data-testid="json-table" style={{ height: '100%' }}>
        <Container>
          {!hideToolbar && (
            <Toolbar>
              <Form
                ref={formRef}
                style={{ justifyContent: 'center', alignItems: 'flex-start' }}
              >
                {optionsGroup && (
                  <GroupBy
                    title={groupBy ? groupBy.label : null}
                    options={optionsGroup}
                    onClear={() => {
                      setGroupBy(null);
                      loadData(false);
                    }}
                    onSelect={(selected) => {
                      setGroupBy(selected);
                      changeTableProps({
                        ...tableProps,
                        groups: [
                          {
                            columnKey: selected.value,
                          },
                        ],
                      });
                    }}
                  />
                )}
              </Form>
              <button type="button" onClick={() => exportClick(pdfOrientation)}>
                <PdfIcon size={24} color="#353c44" />
              </button>
              <CSVLink
                data={kaPropsUtils.getData(tableProps)}
                headers={tableProps.columns
                  .filter((c) => {
                    const notExports = ['button', 'selection'];
                    if (c.settings && notExports.includes(c.settings.type)) {
                      return false;
                    }

                    return true;
                  })
                  .map((c) => ({
                    label: c.title,
                    key: c.key,
                  }))}
                filename={`${fileName}.csv`}
                enclosingCharacter=""
                separator=";"
              >
                <ExcelIcon size={28} color="#353c44" />
              </CSVLink>
              <button
                style={{ cursor: 'pointer', marginLeft: '1rem' }}
                type="button"
                onClick={() => {
                  if (reportSettings.autoRefresh && autoRefreshRef.current) {
                    autoRefreshRef.current.reset();
                  }
                  onReloadData();
                }}
              >
                <ReloadIcon size={25} color="#353c44" />
              </button>
              {reportSettings && reportSettings.autoRefresh && (
                <AutoRefresh
                  ref={autoRefreshRef}
                  value={reportSettings.autoRefresh}
                  onEnd={onReloadData}
                />
              )}
            </Toolbar>
          )}
          <Content>
            <ResposiveContainer>
              <Table
                {...tableProps}
                dispatch={dispatch}
                childComponents={{
                  /* noDataRow: {
                    content: () => <div>Nenhum item encontrado</div>,
                  }, */
                  headCell: {
                    content: (props) => {
                      if (props.column.settings) {
                        if (props.column.settings.type === 'selection') {
                          return (
                            <SelectionHeader
                              {...props}
                              areAllRowsSelected={kaPropsUtils.areAllFilteredRowsSelected(
                                tableProps
                              )}
                            />
                          );
                        }
                      }
                    },
                  },
                  dataRow: {
                    elementAttributes: ({ rowData }) => {
                      let style = null;
                      if (getRowColor) {
                        style = {
                          backgroundColor: getRowColor({ data: rowData }),
                        };
                      }

                      return {
                        style,
                        onClick: (event, extendedEvent) => {
                          if (!isMultSelection) {
                            extendedEvent.dispatch(
                              selectSingleRow(
                                extendedEvent.childProps.rowKeyValue
                              )
                            );

                            if (onSelect) onSelect({ data: rowData });
                          }
                        },
                      };
                    },
                    content: (props) => {
                      if (
                        isMobile &&
                        reportSettings &&
                        reportSettings.mobileCardTemplate
                      ) {
                        const buttons = swipeButtonsSettings({
                          rowData: props.rowData,
                        });

                        return (
                          <SwipeableList scrollStartThreshold>
                            <SwipeableListItem
                              swipeLeft={buttons.swipeRight}
                              swipeRight={buttons.swipeLeft}
                            >
                              <Card
                                templateFields={cardTemplateFields}
                                columns={props.columns}
                                data={props.rowData}
                                reportSettings={reportSettings}
                                settings={settings}
                                onRefresh={onRefresh}
                                getRowColor={getRowColor}
                                onClick={() => {
                                  modalDetailRef.current.open({
                                    data: props.rowData,
                                    columns: props.columns,
                                  });
                                }}
                              />
                            </SwipeableListItem>
                          </SwipeableList>
                        );
                      }
                      return null;
                    },
                  },
                  cell: {
                    elementAttributes: ({ column }) => ({
                      'data-column': column.title,
                    }),
                    // content: props => <div>Custom Content</div>,
                  },
                  cellText: {
                    content: (props) => {
                      let style = null;

                      if (props.column.settings) {
                        const cellStyleFunction = getCellStyleFunction(
                          props.column.settings.cellStyle
                        );
                        if (cellStyleFunction) {
                          style = cellStyleFunction({
                            data: props.rowData,
                            value: props.value,
                          });
                        }
                      }

                      return getCellText({
                        field: props.field,
                        column: props.column,
                        rowData: props.rowData,
                        value: props.value,
                        rowKeyValue: props.rowKeyValue,
                        dispatch: props.dispatch,
                        props,
                        settings,
                        onRefresh,
                        showLoading,
                        paramsModal,
                        style,
                        items: tableProps.data,
                        getSelectedData: () =>
                          kaPropsUtils.getSelectedData(tableProps),
                        scopes,
                      });
                    },
                  },
                  filterRowCell: {
                    content: (props) => {
                      // eslint-disable-next-line react/destructuring-assignment
                      const { settings: columnSettings } = props.column;

                      if (columnSettings) {
                        const notExports = ['button', 'selection'];
                        if (notExports.includes(columnSettings.type)) {
                          return <></>;
                        }
                      }

                      switch (props.column.dataType) {
                        case 'date':
                          return <DateFilter {...props} />;

                        case 'number':
                          return <NumberFilter {...props} />;

                        case 'boolean':
                          return <TextFilter {...props} disabled />;

                        default:
                          return <TextFilter {...props} />;
                      }
                    },
                  },
                }}
              />
            </ResposiveContainer>
          </Content>
          <Resume>{`${data.length} registro(s)`}</Resume>
          <SwipeModalButtons ref={modalSwipeButtonsRef} />
          <ModalDetail ref={modalDetailRef} />
          {footerButtons.length > 0 && (
            <FooterBar>
              {footerButtons.map((element) => (
                <Button
                  key={element.text}
                  buttonType={element.type}
                  onClick={async () => {
                    await dynamicFunction({
                      dispatch,
                      functionString: element.handler,
                      settings,
                      promptRef,
                      params: {
                        columns: tableProps.columns,
                        data: tableProps.data,
                        refresh: onRefresh,
                        showLoading,
                        paramsModal,
                        getSelectedData: () =>
                          kaPropsUtils.getSelectedData(tableProps),
                        ...scopes.footerButtons,
                      },
                    });
                  }}
                >
                  {element.text}
                </Button>
              ))}
            </FooterBar>
          )}
        </Container>
        {isMobile && (
          <SearchMobileInput
            placeholder="Procurar..."
            type="search"
            defaultValue={tableProps.searchText}
            onChange={(event) => {
              dispatch(search(event.currentTarget.value));
            }}
          />
        )}
        <PromptModal ref={promptRef} />
      </div>
    </PageContext.Provider>
  );
};

export default forwardRef(JsonTable);

/* documentação do ReactTooltip em: https://www.npmjs.com/package/react-tooltip */
/* https://github.com/sandstreamdev/react-swipeable-list */
