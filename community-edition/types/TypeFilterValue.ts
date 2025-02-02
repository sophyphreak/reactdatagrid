/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TypeColumn } from '.';

export type TypeSingleFilterValue = {
  name: string;
  type: string;
  operator: string;
  value: any;
  emptyValue?: any;
  fn?: (arg: any) => any;
  getFilterValue?: Function;
  active?: boolean;
};

export type TypeFilterParam = {
  column?: TypeColumn;
  data?: any;
  emptyValue?: string;
  filterValue?: string | number;
  value?: string | number;
};

export type TypeFilterValue = TypeSingleFilterValue[] | null;
export default TypeFilterValue;

export type TypeFilterOperator = {
  name: string;
  fn: ({
    value,
    filterValue,
    data,
    emptyValue,
  }: {
    value: any;
    filterValue: any;
    data: any;
    emptyValue: any;
  }) => boolean;
  filterOnEmptyValue?: boolean;
  valueOnOperatorSelect?: any;
  disableFilterEditor?: boolean;
};

export type TypeFilterType = {
  type: string;
  emptyValue: any;
  operators: TypeFilterOperator[];
};

export type TypeFilterTypes = {
  [key: string]: TypeFilterType;
};
