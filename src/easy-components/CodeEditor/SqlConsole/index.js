/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import compareRender from '../../Helpers/compareRender';

import { Container } from './styles';

function SqlConsole({ result }) {
  function getColumns(row) {
    const columns = [];

    Object.keys(row).forEach(prop => {
      columns.push(prop);
    });

    return columns;
  }

  function renderTable(data) {
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

  return <Container>{renderTable(result)}</Container>;
}

export default compareRender(SqlConsole);
