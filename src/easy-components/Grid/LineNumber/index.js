import React from "react";

import { Container } from "./styles";

export default function LineNumber({ col, rows, idx }) {
  const contentStyle = {
    flex: col.flex,
    width: col.width,
    minWidth: col.width,
    textAlign: col.textAlign
  };

  const value = rows[idx][col.name] == null ? "" : rows[idx][col.name];

  return (
    <Container
      style={{ ...contentStyle }}
      showBlocked={col.config && col.config.showBlocked}
      readOnly
    >
      <span>{value}</span>
    </Container>
  );
}
