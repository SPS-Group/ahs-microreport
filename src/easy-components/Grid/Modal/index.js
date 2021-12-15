import React from "react";

import { Container, Background, Content } from "./styles";

export default function Modal({ isOpened, onClose, children, ...rest }) {
  document.body.style.overflow = isOpened ? "hidden" : "auto";

  function onKeyDown(evt, close) {
    switch (evt.key) {
      case "Escape":
        close();
        break;

      case "Tab":
        evt.preventDefault();
        break;

      default:
    }
  }
  return (
    <Container isOpened={isOpened} onKeyDown={evt => onKeyDown(evt, onClose)}>
      <Background />
      <Content {...rest}>{children}</Content>
    </Container>
  );
}
