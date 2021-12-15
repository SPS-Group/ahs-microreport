/* eslint-disable react/prop-types */
import React from 'react';
import Monaco from '@monaco-editor/react';

import { Container, TBar } from './styles';

function Editor({ tbar, value, onChange, language }) {
  return (
    <>
      {tbar && <TBar>{tbar}</TBar>}
      <Container>
        <Monaco
          theme="vs-dark"
          options={{
            selectOnLineNumbers: true,
          }}
          defaultLanguage={language}
          value={value || ''}
          onChange={onChange}
        />
      </Container>
    </>
  );
}

export default Editor;
