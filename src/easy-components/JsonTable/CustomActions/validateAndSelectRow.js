import { updateCellValue } from 'ka-table/actionCreators';
import dynamicFunction from '../dynamicFunction';

export const VALIDATE_AND_SELECT_TYPE = 'VALIDATE_AND_SELECT_TYPE';

const validateAndSelectAction = ({
  cellProps,
  rowData,
  value,
  rowKeyValue,
  forceSelection = false,
}) => ({
  type: VALIDATE_AND_SELECT_TYPE,
  payload: {
    cellProps,
    rowData,
    value,
    rowKeyValue,
    dynamicFunction,
    updateCellValue,
    forceSelection,
  },
});
export default validateAndSelectAction;
