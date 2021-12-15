/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';

import Icon from '~/easy-components/Icon';

export default function OptionCell({ column, value }) {
  function getIcon(iconValue) {
    if (value && column.settings.type === 'option' && column.settings.options) {
      const { options } = column.settings;

      const icon = options.find((option) => option.value === iconValue);

      return <Icon name={icon.icon} size={icon.size} color={icon.color} />;
    }

    return null;
  }

  return getIcon(value);
}
