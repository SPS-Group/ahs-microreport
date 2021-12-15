import { formatNumber } from '../CustomCells/DisplayNumberCell';
import { formatDate } from '../CustomCells/DisplayDateCell';

export default function getFormatCellText({ column }) {
  if (column.settings) {
    switch (column.settings.type) {
      case 'number':
        return formatNumber;

      case 'date':
        return formatDate;

      default:
        return null;
    }
  }

  return null;
}
