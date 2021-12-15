/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
/* import PropTypes from "prop-types";
import ReactResizeDetector from "react-resize-detector";
import { FiSettings } from "react-icons/all";
import { Menu, Item, contextMenu } from "react-contexify";
import Modal from "./Modal";
import Settings from "./Settings";
import "react-contexify/dist/ReactContexify.min.css";
import "./global.css";

import { Container } from "./styles";
import Input from "./Input";
import Linker from "./Linker";
import Text from "./Text";
import ComboBox from "./ComboBox";
import CheckBox from "./CheckBox";
import Number from "./Number"; */

function EasyGrid({
  keyField,
  title,
  cols,
  setCols,
  data,
  setData,
  lineHeight,
  defaultData,
  rowContextMenu,
  rowContextMenuShow,
  menuAnimationType,
  renderRowCls,
  backgroundColor,
  color
}) {
  return <div />;
  /* const [menus, setMenus] = useState([]);
  const [width, setWidth] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (data.length > 0) {
    if (data[data.length - 1][keyField]) {
      data = [...data, { ...defaultData }];
    }
  } else {
    data = [{ ...defaultData } || {}];
  }

  function getEditor(col, idx) {
    switch (col.editor) {
      case "Number":
        return (
          <Number
            key={col.name}
            col={col}
            rows={data}
            setRows={setData}
            idx={idx}
          />
        );

      case "CheckBox":
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
        );

      default:
        return <Text key={col.name} col={col} rows={data} idx={idx} />;
    }
  }
  function onResize(WidthEl) {
    setWidth(WidthEl);
  }
  function onScroll(evt) {
    const w = evt.target.clientWidth + evt.target.scrollLeft;
    evt.target.children[1].style.width = `${w}px`;
  }
  function createRowContextMenu() {
    return (
      <Menu id="row_context_menu" animation={menuAnimationType}>
        {menus.map(menu => {
          return (
            <Item
              key={menu.text}
              onClick={menu.onHandler}
              disabled={menu.disabled}
            >
              <div>{menu.text}</div>
            </Item>
          );
        })}
      </Menu>
    );
  }
  function onShowContextMenu(dataContext) {
    dataContext.e.persist();
    contextMenu.hideAll();
    // const event = data.e;

    setTimeout(function() {
      if (rowContextMenuShow) {
        const newMenus = rowContextMenuShow({
          ...dataContext,
          contextMenu: rowContextMenu
        });

        const bindHandlers = newMenus.map(m => {
          m.onHandler = () => {
            m.handler({
              data,
              setData,
              idx: dataContext.idx,
              line: dataContext.line
            });
          };

          return m;
        });

        setMenus([...bindHandlers]);
      }

      contextMenu.show({
        id: dataContext.menuId,
        event: dataContext.e,
        props: {
          foo: "bar"
        }
      });
    }, 10);

    dataContext.e.preventDefault();
  }
  function createHeader() {
    return cols.map(col => {
      return (
        <div
          key={col.name}
          className={`${col.cls || ""}`}
          style={{
            minWidth: col.width,
            maxWidth: col.width,
            flex: col.flex,
            display: col.hidden ? "none" : "flex"
          }}
        >
          {col.title}
        </div>
      );
    });
  }
  function createLines() {
    return data.map((d, idx) => {
      const className = renderRowCls({
        data,
        line: data[idx],
        idx
      });

      return (
        <div
          key={`row_${idx}`}
          className={`row ${className || ""}`}
          onContextMenu={e =>
            onShowContextMenu({
              e,
              menuId: "row_context_menu",
              line: data[idx],
              idx
            })
          }
        >
          {cols.map((col, i) => {
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
        </div>
      );
    });
  }
  return (
    <Container
      lineHeight={lineHeight}
      headerBgColor={backgroundColor}
      headerTextColor={color}
    >
      <div className="title">
        <div>{title}</div>
        <div className="actions">
          <div onClick={() => setSettingsOpen(!settingsOpen)}>
            <FiSettings size={18} color={color} />
          </div>
        </div>
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
      {createRowContextMenu()}
      <Modal isOpened={settingsOpen}>
        <Settings
          cols={cols}
          setCols={setCols}
          setSettingOpened={() => setSettingsOpen(!settingsOpen)}
        />
      </Modal>
    </Container>
  ); */
}

/* EasyGrid.propTypes = {
  keyField: PropTypes.string,
  title: PropTypes.string,
  lineHeight: PropTypes.number,
  defaultData: PropTypes.shape(),
  rowContextMenu: PropTypes.arrayOf(PropTypes.shape()),
  renderRowCls: PropTypes.func,
  rowContextMenuShow: PropTypes.func,
  menuAnimationType: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  cols: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setCols: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setData: PropTypes.func.isRequired
};

EasyGrid.defaultProps = {
  defaultData: {},
  keyField: null,
  title: null,
  lineHeight: 45,
  rowContextMenu: null,
  rowContextMenuShow: () => {},
  menuAnimationType: "flip",
  renderRowCls: () => {},
  backgroundColor: "#f7f7f7",
  color: "#444"
}; */

export default EasyGrid;
