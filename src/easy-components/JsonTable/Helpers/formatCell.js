import { createSyncFunctionByString } from '../../AsyncFunctionString';

export function formatCell({ value, column, rowData, field }) {
  if (column) {
    const { settings } = column;

    if (settings) {
      if (settings.format) {
        const dynamicFunction = createSyncFunctionByString({
          functionString: settings.format,
        });

        const newValue = dynamicFunction({ value, column, data: rowData });
        return newValue;
      }
    }
  }
  if (value === undefined) {
    return `{${field}}`;
  }
  return value !== null ? value.toString() : '';
}
