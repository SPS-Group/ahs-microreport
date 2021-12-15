/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import { Container } from './styles';

function IFrame({ src, isBase64 = false }) {
  function createPdf() {
    // Para exibição no celular é necessário usar a api do google

    const url =
      isMobile && !isBase64
        ? `http://docs.google.com/gview?url=${src}&embedded=true`
        : src;
    const element = document.createElement('iframe');

    element.setAttribute('src', url);

    // 'http://docs.google.com/gview?url=http://187.121.49.102:9444/pdf/view/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImNvbXBhbnlJZCI6IjEiLCJwcm9wb3NhbElkIjoyNSwiZHVlRGF0ZSI6IjIwMjEtMDMtMDFUMDA6MDA6MDAiLCJkZXN0aW5hdGlvbiI6Im1vbmljYS5mZXJyZWlyYUBzcHNjb25zdWx0b3JpYS5jb20uYnIiLCJpc1JlYWRPbmx5IjpmYWxzZSwiaWF0IjoxNjE0MzY2NjQyfQ.nlt7Ow4VcuqhKC_Ui3OvJbz-kSWRYmEM3AW3bjywdxE&embedded=true';

    const divPdfViewer = document.getElementById('pdfviewer');

    while (divPdfViewer.firstChild) {
      divPdfViewer.removeChild(divPdfViewer.firstChild);
    }

    divPdfViewer.appendChild(element);
  }

  useEffect(() => {
    if (src) createPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <Container id="pdfviewer" />;
}

export default IFrame;
