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

const EMPTY_OBJECT = {};

type TypeConfig = {
  idProperty?: string;
  expandedNodes?: { [key: string]: boolean };
  pathSeparator?: string;
  nodesName: string;
  generateIdFromPath?: boolean;
  filterValueArray: TypeSingleFilterValue[];
  filterTypes: any;
  columnsMap: { [key: string]: TypeColumn };
};

const doFilter = (
  item: any,
  filterValueArray: TypeSingleFilterValue[],
  filterTypes: any = DEFAULT_FILTER_TYPES,
  columnsMap: { [key: string]: TypeColumn }
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

let newParentNode: {} = EMPTY_OBJECT;
const filterData = (
  dataArray: any[],
  config: TypeConfig,
  parentNode?: any,
  result: any[] = [],
  newDataArray: any[] = []
): any[] => {
  const nodesName = config.nodesName;
  const filterValueArray = config.filterValueArray;
  const filterTypes = config.filterTypes;
  const columnsMap = config.columnsMap;

  const filterFn = (filterItem: any) => {
    const filter: boolean = doFilter(
      filterItem,
      filterValueArray,
      filterTypes,
      columnsMap
    );

    return filter;
  };

  dataArray.forEach((item: any) => {
    if (item) {
      const itemNodes = item[nodesName];

      const filteredItem = filterFn(item);
      if (filteredItem) {
        newDataArray.push(item);
      }

      if (parentNode) {
        newParentNode = {};
        if (newDataArray.length > 0) {
          Object.assign(newParentNode, parentNode, {
            [nodesName]: newDataArray,
          });
        }
      }

      if (Array.isArray(itemNodes)) {
        filterData(itemNodes, config, item, result);
      } else {
        if (!parentNode) {
          newParentNode = {};
          const filteredItem = filterFn(item);
          if (filteredItem) {
            Object.assign(newParentNode, item);
          }
        }
      }

      if (!parentNode) {
        if (Object.keys(newParentNode).length) {
          result.push(newParentNode);
        }
      }
    }
  });

  return result;
};

const treeFilter = (
  data: any[],
  filterValueArray: TypeSingleFilterValue[],
  filterTypes: any = DEFAULT_FILTER_TYPES,
  columnsMap: { [key: string]: TypeColumn },
  options: { props: TypeComputedProps }
): any[] | ((item: any) => boolean) => {
  const computedProps: TypeComputedProps = options.props || {};
  const nodesName: string = computedProps.nodesProperty || 'nodes';

  const config: TypeConfig = {
    nodesName,
    filterValueArray,
    filterTypes,
    columnsMap,
  };

  const filteredData = filterData(data, config);

  return filteredData || [];
};

export default treeFilter;
