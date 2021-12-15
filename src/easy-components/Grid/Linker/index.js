import React, { useState, useRef } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { GoArrowRight } from "react-icons/all";
import { Container } from "./styles";
import Modal from "../Modal";
import SearchPage from "./search";

export default function Linker({ col, rows, idx, setRows }) {
  const inputRef = useRef();

  const [data, setData] = useState();
  const [filterData, setFilterData] = useState([]);
  const [changed, setChanged] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  function selectItem({ item }) {
    const value = item[col.config.valueField];

    if (value) rows[idx][col.name] = item[col.config.valueField];

    if (col.config.onSelect) {
      if (typeof col.config.onSelect !== "function") {
        col.config.onSelect.map(field => {
          return (rows[idx][field.set] = item[field.get]);
        });
        setRows([...rows]);
      } else {
        col.config.onSelect({
          item,
          rows,
          line: rows[idx],
          idx,
          colName: col.name
        });
      }
    }
  }

  function onKeyUp(e) {
    if (e.key === "F2") {
      setData(rows[idx][col.name] || "");
      setOpenModal(true);
    }
  }

  function clearItem() {
    if (col.config.onSelect) {
      if (typeof col.config.onSelect !== "function") {
        col.config.onSelect.map(field => {
          return (rows[idx][field.set] = null);
        });
        setRows([...rows]);
      } else {
        col.config.onSelect({
          item: null,
          rows,
          line: rows[idx],
          idx,
          colName: col.name
        });
      }
    }
  }
  return (
    <>
      <Container
        style={{
          flex: col.flex,
          width: col.width,
          minWidth: col.width,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <span
          onClick={() =>
            col.config.linkEnabled && rows[idx][col.config.keyLinkCol]
              ? col.config.onLinkClick({ line: rows[idx], idx })
              : null
          }
        >
          {rows[idx][col.config.keyLinkCol] && (
            <GoArrowRight
              size={20}
              color={col.config.linkEnabled ? "rgb(248, 161, 0)" : "#AAA"}
            />
          )}
        </span>
        <input
          style={{
            flex: 1
          }}
          ref={inputRef}
          key={col.name}
          value={rows[idx][col.name] || ""}
          onKeyUp={onKeyUp}
          onBlur={async e => {
            if (changed) {
              setData(e.target.value);
              if (col.config.search) {
                const items = await col.config.search({
                  value: e.target.value,
                  line: rows[idx],
                  colName: col.name,
                  rows
                });

                switch (items.length) {
                  case 1:
                    const item = items[0];
                    selectItem({
                      item,
                      line: rows[idx],
                      colName: col.name,
                      rows
                    });
                    setFilterData(items);
                    break;

                  default:
                    clearItem();
                    setFilterData(items);
                    setOpenModal(true);
                    break;
                }
              } else {
                setFilterData([]);
                setOpenModal(true);
              }

              setChanged(false);
            }
          }}
          onChange={e => {
            setChanged(true);
            rows[idx][col.name] = e.target.value;
            setRows([...rows]);
          }}
        />
        <FaEllipsisH
          size={12}
          color="#777"
          onClick={() => {
            setData(rows[idx][col.name] || "");
            setOpenModal(true);
          }}
        />
        <Modal
          isOpened={isOpenModal}
          onClose={() => {
            inputRef.current.focus();
            setOpenModal(false);
          }}
        >
          <SearchPage
            col={col}
            rows={rows}
            idx={idx}
            setRows={setRows}
            onClose={() => {
              inputRef.current.focus();
              setOpenModal(false);
            }}
            text={data}
            selectItem={selectItem}
            filterData={filterData}
          />
        </Modal>
      </Container>
    </>
  );
}
