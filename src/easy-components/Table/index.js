/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";

import { Container, Body } from "./styles";

/* $(".table-body").scroll(function() {
  $(".table-header").offset({ left: -1 * this.scrollLeft });
}); */

export default function Table({ children, data }) {
  const [cols, setCols] = useState([]);

  const ref = useRef();
  const ref2 = useRef();

  function onScroll(e) {
    ref2.current.style = `left: ${-1 * e.currentTarget.scrollLeft}px`;
  }

  useEffect(() => {
    if (Array.isArray(children)) {
      const list = children.map(({ props }) => {
        return {
          type: "text",
          ...props
        };
      });
      setCols(list);
    } else {
      setCols([
        {
          type: "text",
          value: children.props.title
        }
      ]);
    }

    ref.current.addEventListener("scroll", onScroll);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current.removeEventListener("scroll", onScroll);
    };
  }, [children]);

  return (
    <Container>
      {children ? (
        <div className="outer-container">
          <div className="inner-container">
            <Body ref={ref2} className="table-header">
              <table id="headertable">
                <thead>
                  <tr>
                    {cols.map(c => (
                      <th
                        key={c.value}
                        className="header-cell col"
                        style={{ width: c.width, minWidth: c.width }}
                      >
                        {c.title}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </Body>
            <Body ref={ref} className="table-body">
              <table id="bodytable">
                <tbody>
                  {data.map((d, idx) => {
                    return (
                      <tr
                        key={`line-${idx}`}
                        style={{
                          display: "flex",
                          height: "40px",
                          backgroundColor: d._RowColor
                        }}
                      >
                        {cols.map(c => {
                          const newValue = c.transform
                            ? c.transform(d[c.value], {
                                value: d[c.value],
                                index: idx,
                                data
                              })
                            : d[c.value];

                          return (
                            <td
                              key={`col-${c.value}-${idx}`}
                              className="body-cell col"
                              style={{
                                width: c.width,
                                minWidth: c.width,
                                flex: 1,
                                display: "flex",
                                paddingRight: "10px",
                                padding: "5px"
                              }}
                            >
                              {c.renderElement ? (
                                c.renderElement(newValue, {
                                  value: newValue,
                                  rawValue: d[c.value],
                                  index: idx,
                                  data
                                })
                              ) : (
                                <div
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  {newValue}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Body>
          </div>
        </div>
      ) : (
        <div />
      )}
    </Container>
  );
}
