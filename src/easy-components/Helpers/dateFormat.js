import { format as formatDt } from 'date-fns';

function dateFormat(date, format, useUTC = false) {
  try {
    if (date) {
      let dateRaw = date;

      if (typeof date !== 'object') {
        if (useUTC) {
          const value = formatDt(new Date(dateRaw), format || 'dd/MM/yyyy');
          return value;
        }

        if (date.indexOf('Z') >= 0) {
          dateRaw = date.replace('Z', '');
        }

        const value = formatDt(new Date(dateRaw), format || 'dd/MM/yyyy');
        return value;
      }

      return formatDt(dateRaw, format || 'dd/MM/yyyy');
    }

    return null;
  } catch (ex) {
    return null;
  }
}

export default dateFormat;
