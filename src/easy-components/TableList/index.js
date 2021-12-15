import React from 'react';

import { Container } from './styles';

function TableList({
  data = [],
  columns,
  title,
  renderLine,
  headerStyle,
  rowStyle,
}) {
  return (
    <Container>
      <table>
        {title && <caption>{title}</caption>}
        <thead>
          <tr style={{ ...headerStyle }}>
            {columns.map(col => {
              return (
                <th scope="col" style={{ ...col.style, ...col.headerStyle }}>
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            let lineStyle = null;

            if (renderLine) {
              lineStyle = renderLine({ item });
            }

            return (
              <tr style={lineStyle}>
                {columns.map(col => {
                  let columnStyle = null;

                  if (col.renderColumn) {
                    columnStyle = col.renderColumn({
                      col,
                      item,
                      value: item[col.name],
                    });
                  }

                  return (
                    <td
                      data-label={col.label}
                      style={{ ...col.style, ...rowStyle, ...columnStyle }}
                    >
                      {item[col.name]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/*proposals && proposals.map(proposal => <ProposalItem data={proposal} />)*/}
    </Container>
  );
}

export default TableList;
