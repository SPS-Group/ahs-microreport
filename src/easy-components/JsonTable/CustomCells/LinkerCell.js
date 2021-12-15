/* eslint-disable no-new-func */
/* eslint-disable react/prop-types */
import React from 'react';

import LinkIcon from '~/easy-components/LinkIcon';

import { Linker } from '../styles';
import dynamicFunction from '../dynamicFunction';

function LinkerCell({ column, rowData, value, settings, scopes = {} }) {
  return (
    <Linker>
      {value && (
        <LinkIcon
          onClick={async () => {
            if (column.settings && column.settings.type === 'link') {
              await dynamicFunction({
                functionString: column.settings.onClick,
                settings,
                params: {
                  column,
                  line: rowData,
                  value,
                  ...scopes.row,
                },
              });
            }
          }}
        />
      )}
      {value}
    </Linker>
  );
}

export default LinkerCell;
