/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import DEFAULT_FILTER_TYPES from './filterTypes';
import {
  TypeSingleFilterValue,
  TypeColumn,
  TypeFilterParam,
  TypeComputedProps,
} from './types';
import {
  buildTypeOperators,
  buildFilterParam,
  validateFilters,
} from './filter';

type TypeConfig = {
  nodesName: string;
  idProperty?: string;
  expandedNodes?: { [key: string]: boolean };
  pathSeparator?: string;
  generateIdFromPath?: boolean;
  filterValueArray?: TypeSingleFilterValue[];
  filterTypes?: any;
  columnsMap?: { [key: string]: TypeColumn };
};

type TypeFilterFn = (item: any) => boolean;

const doFilter = (
  item: any,
  filterValueArray: TypeSingleFilterValue[],
  filterTypes: any = DEFAULT_FILTER_TYPES,
  columnsMap?: { [key: string]: TypeColumn }
): boolean => {
  const typeOperators: any = buildTypeOperators(filterTypes);

  for (let i = 0, len = filterValueArray.length; i < len; i++) {
    const fv: TypeSingleFilterValue = filterValueArray[i];
    const { type, operator, fn } = fv;
    const currentTypeOperators = typeOperators[type];

    if (validateFilters(fv, filterTypes, currentTypeOperators)) {
      continue;
    }

    const filterParam: TypeFilterParam = buildFilterParam(
      item,
      fv,
      filterTypes,
      columnsMap
    );

    const filterFn = fn || currentTypeOperators[operator].fn;
    if (filterFn(filterParam) !== true) {
      return false;
    }
  }

  return true;
};

const filterData = (
  dataArray: any[],
  filterFn: TypeFilterFn,
  config: TypeConfig
): any[] => {
  const nodesName = config.nodesName;

  return (
    dataArray
      // the map fn is here only to make sure filtered results
      // are not kept in the initial datasource
      .map(item => {
        return {
          ...item,
        };
      })
      .filter((item: any) => {
        const itemNodes = item[nodesName];

        if (!itemNodes) {
          return filterFn(item);
        }
        const filteredItemNodes = filterData(itemNodes, filterFn, config);

        if (filteredItemNodes.length) {
          item[nodesName] = filteredItemNodes;
          return true;
        }

        return filterFn(item);
      })
  );
};

const treeFilter = (
  data: any[],
  filterValueArray: TypeSingleFilterValue[],
  filterTypes: any = DEFAULT_FILTER_TYPES,
  columnsMap?: { [key: string]: TypeColumn },
  options?: { props: TypeComputedProps }
): any[] | ((item: any) => boolean) => {
  const computedProps: TypeComputedProps | {} =
    (options && options.props) || {};
  const nodesName: string =
    (computedProps && (computedProps as any).nodesProperty) || 'nodes';

  const config: TypeConfig = {
    nodesName,
  };

  const filterFn = (item: any) => {
    const filterItem: boolean = doFilter(
      item,
      filterValueArray,
      filterTypes,
      columnsMap
    );

    return filterItem;
  };

  return filterData(data, filterFn, config) || [];
};

export default treeFilter;
