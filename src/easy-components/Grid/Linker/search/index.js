import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/all";
import ReactResizeDetector from "react-resize-detector";
import { Container, Line } from "./styles";
import Display from "../../Display";

export default function Seach({
  onClose,
  onConfirm,
  col,
  text,
  rows,
  idx,
  selectItem,
  filterData
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(text);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    setSelectedIndex(-1);
    setData(filterData);
  }, [filterData]);

  function onScroll(evt) {
    const width = evt.target.clientWidth + evt.target.scrollLeft;
    evt.target.children[1].style.width = `${width}px`;
  }

  function onResize(WidthEl) {
    setWidth(WidthEl);
  }

  function createHeader() {
    return (col.config.cols || []).map(c => {
      return (
        <div
          key={c.name}
          className={`${c.cls || ""}`}
          style={{
            minWidth: c.width,
            maxWidth: c.width,
            flex: c.flex,
            display: c.hidden ? "none" : "flex"
          }}
        >
          {c.title}
        </div>
      );
    });
  }
  function getEditor(col, idx) {
    switch (col.editor) {
      /* case "CheckBox":
        return (
          <CheckBox
            key={col.name}
            col={col}
            rows={data}
            setRows={setData}
            idx={idx}
          />
        );

      case "ComboBox":
        return (
          <ComboBox
            key={col.name}
            col={col}
            rows={data}
            setRows={setData}
            idx={idx}
          />
        );

      case "Input":
        return (
          <Input
            key={col.name}
            col={col}
            rows={data}
            setRows={setData}
            idx={idx}
          />
        );

      case "Linker":
        return (
          <Linker
            key={col.name}
            col={col}
            rows={data}
            setRows={setData}
            idx={idx}
          />
        ); */

      default:
        return <Display key={col.name} col={col} rows={data} idx={idx} />;
    }
  }
  function onSelect(item) {
    selectItem({
      item,
      line: rows[idx],
      colName: col.name,
      rows
    });
    onClose();
  }
  function createLines() {
    return data.map((d, idx) => {
      // const className = renderRowCls(data[idx], idx);
      const className = "";
      return (
        <Line
          key={`row_${idx}`}
          className={`row ${className || ""}`}
          onClick={() => onSelect(d)}
          selected={selectedIndex === idx}
        >
          {col.config.cols.map((col, i) => {
            return (
              <div
                key={`col_row_${i}`}
                className={`${col.cls || ""}`}
                style={{
                  minWidth: col.width,
                  maxWidth: col.width,
                  flex: col.flex,
                  display: col.hidden ? "none" : "flex"
                }}
              >
                {getEditor(col, idx)}
              </div>
            );
          })}
        </Line>
      );
    });
  }

  async function onKeyDown(e) {
    let i = selectedIndex;
    const count = data.length;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          setSelectedIndex(-1);
          onSelect(data[selectedIndex]);
        } else {
          const items = await col.config.search({
            value: e.target.value,
            line: rows[idx],
            colName: col.name,
            rows
          });

          setSelectedIndex(-1);
          setData(items);
        }

        break;

      case "ArrowUp":
        if (count > 0) {
          if (i > 0) {
            i -= 1;
          } else {
            i = 0;
          }
        } else i = -1;

        setSelectedIndex(i);
        break;

      case "ArrowDown":
        if (count > 0) {
          if (i + 1 < count) {
            i += 1;
          } else {
            i = count - 1;
          }
        } else i = -1;

        setSelectedIndex(i);
        break;

      default:
        setSelectedIndex(-1);
        break;
    }
  }

  return (
    <Container>
      <div className="setting-header">
        <h1>Procurar</h1>
        <MdClose size={24} color="#333" onClick={onClose} />
      </div>
      <div className="search">
        <input
          autoComplete="off"
          autoCorrect="off"
          name="searchText"
          placeholder="Pesquisar..."
          value={value || ""}
          onChange={e => setValue(e.target.value)}
          autoFocus
          ref={input => input && input.focus()}
          onKeyDown={onKeyDown}
        />
      </div>
      <div className="table" onScroll={onScroll}>
        <div className="thead" style={{ width: `${width}px` }}>
          <div className="row">{createHeader()}</div>
        </div>
        <div className="tbody">
          <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
          {createLines()}
        </div>
      </div>
    </Container>
  );
}
