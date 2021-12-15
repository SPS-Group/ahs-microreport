/* eslint-disable react/prop-types */
import React from "react";

import { Container } from "./styles";

export default function PageContainer({ children }) {
  return <Container>{children}</Container>;
}
