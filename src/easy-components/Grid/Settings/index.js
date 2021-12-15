import React from "react";
import { FaCheck, MdClose } from "react-icons/all";
import { Container } from "./styles";

export default function Settings({ cols, setCols, setSettingOpened }) {
  return (
    <Container>
      <div className="setting-header">
        <h1>Colunas</h1>
        <MdClose
          size={24}
          color="#333"
          onClick={() => setSettingOpened(false)}
        />
      </div>
      <div className="setting-content">
        {cols.map((col, idx) => {
          if (col.editor !== "LineNumber")
            return (
              <div
                key={idx}
                className="option"
                onClick={() => {
                  cols[idx].hidden = !cols[idx].hidden;
                  setCols([...cols]);
                }}
              >
                <div className={"checked"}>
                  {cols[idx].hidden ? null : <FaCheck size={12} color="#333" />}
                </div>
                <div className="column-setting-title">{col.title}</div>
              </div>
            );
          else return null;
        })}
      </div>
    </Container>
  );
}
