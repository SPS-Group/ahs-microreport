/* eslint-disable react/prop-types */
import React from "react";

import { Container } from "./styles";

export default function CheckBox({ col, rows, idx, setRows }) {
  return (
    <Container>
      <input
        type="checkbox"
        // value={rows[idx][col.name]}
        checked={rows[idx][col.name] || false}
        onChange={e => {
          rows[idx][col.name] = e.target.checked;
          setRows([...rows]);
        }}
      />
    </Container>
  );
}
