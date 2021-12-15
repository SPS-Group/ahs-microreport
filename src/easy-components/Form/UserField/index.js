/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React from 'react';
import Field from './Field';

export default function UserField({
  baseName,
  fieldName,
  formRef,
  mainFormRef,
  settings,
  readOnly,
  labelWidth,
}) {
  const { userFields } = settings || {};

  if (userFields) {
    let fName = fieldName;
    if (baseName) fName = `${baseName}.${fieldName}`;

    const elements = userFields.filter(field => field.target === fName);

    const response = elements.map(target => {
      target.labelWidth = labelWidth;
      return (
        <Field
          key={`${baseName}_${target.name}`}
          baseName={baseName}
          target={target}
          formRef={formRef}
          mainFormRef={mainFormRef}
          settings={settings}
          readOnly={readOnly}
        />
      );
    });

    return response;
  }

  return null;
}
