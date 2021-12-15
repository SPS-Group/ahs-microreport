import React from "react";
import {
  MdFirstPage,
  MdLastPage,
  MdArrowBack,
  MdArrowForward
} from "react-icons/all";
import { Container } from "./styles";

export default function Paging() {
  return (
    <Container>
      <MdFirstPage size={24} color="#333" />
      <MdArrowBack size={24} color="#333" />
      Exibindo 40 de 100 registros
      <MdArrowForward size={24} color="#333" />
      <MdLastPage size={24} color="#333" />
    </Container>
  );
}
