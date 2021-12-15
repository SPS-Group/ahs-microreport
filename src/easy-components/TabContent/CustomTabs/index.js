/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { ColumnLayout, Panel } from '~/easy-components';
import Field from '~/easy-components/Form/UserField/Field';

// eslint-disable-next-line react/prop-types
function CustomTab({ settings, formRef, isReadOnly, columns }) {
  return (
    <ColumnLayout>
      {columns.map((col, idx) => {
        return (
          <Panel key={idx} width={`${col.width}px`}>
            {col.fields.map(userField => {
              const fieldSettings = {
                labelWidth: col.labelWidth,
                width: col.width,
                ...userField,
              };

              return (
                <Field
                  key={fieldSettings.name}
                  target={fieldSettings}
                  formRef={formRef}
                  settings={settings}
                  readOnly={isReadOnly}
                />
              );
            })}
          </Panel>
        );
      })}
    </ColumnLayout>
  );
}

export default CustomTab;
