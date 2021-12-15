import React from "react";

import { Container } from "./styles";

export default function Input({ col, rows, idx, setRows }) {
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
    if (col.render)
      val = col.render({ value: val, line: rows[idx], idx, rows });
    if (typeof val === "object") {
      customStyle = val.style;
      value = val.value;
    } else value = val;
  }

  return (
    <Container
      style={{
        ...contentStyle,
        ...customStyle
      }}
      value={value}
      onBlur={e => {
        if (col.config) {
          if (col.config.onChange) {
            col.config.onChange({
              value: e.target.value,
              rows,
              idx,
              colName: col.name
            });
            // setRows([...rowsChanged]);
          }
        }
      }}
      onChange={e => {
        rows[idx][col.name] = e.target.value;
        setRows([...rows]);
      }}
    />
  );
}
