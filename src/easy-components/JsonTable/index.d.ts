/* eslint-disable no-unused-vars */
import React, { MutableRefObject, SetStateAction, Dispatch } from 'react';

interface JsonTableProps {
  title?: string;
  fileName?: string;
  subTitle?: string;
  data?: Array<any>;
  columns?: Array<any>;
  pdfFontSize?: number;
  pdfOrientation?: string;
  groups?: Array<any>;
  reportSettings?: Array<any>;
  onRefresh?: Array<any>;
  showLoading: Dispatch<SetStateAction<boolean>>;
  onSelect?(row: object): void;
  hideToolbar?: boolean;
  hasFilter?: boolean;
  isMultSelection?: boolean;
  paramsModal?: MutableRefObject<any>;
  scopes?: object;
  onReloadData?<DataType>(): Promise<Array<DataType>>;
}

declare const JsonTable: (
  props: JsonTableProps
) => React.FunctionComponentElement<JsonTableProps>;

export default JsonTable;
