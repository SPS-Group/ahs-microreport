/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { memo, useMemo, useEffect, useState, useCallback } from 'react';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from 'react-icons/all';

import PageHeader from '~/easy-components/PageHeader';
import PageBody from '~/easy-components/PageBody';
import ModalFooter from '~/easy-components/ModalFooter';
import FlexSpace from '~/easy-components/FlexSpace';
import Button from '~/easy-components/Button';

import formatNumber from '~/easy-components/Helpers/formatNumber';
import formatDate from '~/easy-components/Helpers/dateFormat';

import { Container, TableBox } from './styles';

function TableInformations({
  title,
  onClose,
  dataTable,
  fixedColumns,
  isModal = true,
}) {
  const [tableData, setTableData] = useState([]);
  const [attributesNames, setAttributesNames] = useState({});

  function ListToHtmlTable({ data, columns }) {
    function getKeys() {
      const cols = [];

      columns.forEach(col => {
        cols.push(col.name);
      });

      return cols;
    }

    function getHeader() {
      const keys = getKeys();
      return keys.map(key => {
        const col = columns.find(c => c.name === key);
        return (
          <th key={key} style={col.headerStyle}>
            {col.title}
          </th>
        );
      });
    }

    function formatCell(value, type) {
      switch (type) {
        case 'bool':
          return (
            <>
              {value.toUpperCase() === 'Y' ? (
                <RiCheckboxCircleLine size={18} color="#333" />
              ) : (
                <RiCheckboxBlankCircleLine size={18} color="#333" />
              )}
            </>
          );

        case 'number':
          return formatNumber(value);

        case 'date':
          return formatDate(value);

        default:
          return value;
      }
    }

    function RenderRow(props) {
      return props.keys.map((key, index) => {
        const col = columns.find(c => c.name === key);
        return (
          <td
            data-label={`${col.title}`}
            key={`${props.data[key]}_${index}`}
            style={col.style}
          >
            {formatCell(props.data[key], col.type)}
          </td>
        );
      });
    }

    function getRowsData() {
      const keys = getKeys();
      return data.map((row, index) => {
        return (
          <tr key={index} style={{ backgroundColor: '#f9f9f9' }}>
            <RenderRow key={index} data={row} keys={keys} />
          </tr>
        );
      });
    }

    return (
      <div>
        <TableBox>
          <thead>
            <tr>{getHeader()}</tr>
          </thead>
          <tbody>{getRowsData()}</tbody>
        </TableBox>
      </div>
    );
  }

  const refresh = useCallback(async () => {
    const quantitiesData = JSON.parse(dataTable);

    if (quantitiesData) {
      const line = quantitiesData[0];

      const headers = {};

      for (const prop in line) {
        headers[prop] = prop;
      }

      setTableData(quantitiesData);
      setAttributesNames(headers);
    } else {
      setTableData([]);
      setAttributesNames({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, dataTable]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const resultTable = useMemo(() => {
    if (tableData.length > 0) {
      const line = tableData[0];

      const styleProps = {
        headerStyle: {
          padding: '10px',
        },
        style: {
          padding: '10px',
          minWidth: '40px',
          height: '40px',
        },
      };

      let columns = [];

      if (fixedColumns) columns = fixedColumns;

      /*
      const columns = [
        {
          name: 'WhsCode',
          title: 'Código do Depósito',
          ...styleProps,
        },
        {
          name: 'Located',
          title: 'Localização',
          ...styleProps,
        },
      ];
      */

      for (const prop in line) {
        columns.push({
          name: prop,
          title: attributesNames[prop],
          ...styleProps,
        });
      }

      return ListToHtmlTable({
        data: tableData,
        columns,
      });
    }

    return null;
  }, [attributesNames, fixedColumns, tableData]);

  return (
    <Container
      onClick={e => {
        e.stopPropagation();
      }}
      isModal={isModal}
    >
      {title && <PageHeader>{title}</PageHeader>}
      <PageBody>{resultTable}</PageBody>
      {isModal && (
        <ModalFooter>
          <FlexSpace />
          <Button
            buttonType="Emphasized"
            onClick={e => {
              e.stopPropagation();
              if (onClose) onClose();
            }}
          >
            Fechar
          </Button>
        </ModalFooter>
      )}
    </Container>
  );
}

export default memo(TableInformations);
