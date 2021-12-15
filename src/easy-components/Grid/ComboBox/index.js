import React from "react";

import { Container } from "./styles";

export default function ComboBox({ col, rows, idx, setRows }) {
  const contentStyle = {
    flex: col.flex,
    width: col.width,
    minWidth: col.width,
    textAlign: col.textAlign
  };

  let customStyle = {};

  let value = "";

  let val = rows[idx][col.name] == null ? "" : rows[idx][col.name];

  if (val != null) {
    if (col.render) val = col.render(val, rows[idx], idx);
    if (typeof val === "object") {
      customStyle = val.style;
      value = val.value;
    } else value = val;
  }

  return (
    <Container
      style={{ ...contentStyle, ...customStyle }}
      value={value}
      onChange={e => {
        rows[idx][col.name] = e.target.value;
        if (col.config.onSelect) {
          col.config.onSelect({
            item: e.target.value,
            line: rows[idx],
            rows,
            idx,
            colName: col.name
          });
          // setRows([...newRows]);
        } else setRows([...rows]);
      }}
    >
      {col.config.data.map(item => (
        <option key={item.id} value={item.id}>
          {item.text}
        </option>
      ))}
    </Container>
  );
}

// https://github.com/JedWatson/react-select
