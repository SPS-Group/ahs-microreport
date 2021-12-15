import React from "react";

import { Container } from "./styles";

export default function Text({ col, rows, idx }) {
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
      style={{ ...contentStyle, ...customStyle }}
      showBlocked={col.config && col.config.showBlocked}
      value={value}
      readOnly
    />
  );
}
