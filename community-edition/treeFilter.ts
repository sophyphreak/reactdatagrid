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
const xfilterData = (
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
        xfilterData(itemNodes, config, item, result);
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

function arrayTreeFilter<T>(
  data: T[],
  filterFn: (item: T, level: number) => boolean,
  options?: {
    childrenKeyName?: string;
  }
) {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'nodes';

  var children = data || [];
  var result: T[] = [];
  var level = 0;

  do {
    var foundItem: T = children.filter(function(item) {
      return filterFn(item, level);
    })[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = (foundItem as any)[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);

  return result;
}

const filterData = (
  dataArray: any[],
  filterFn: TypeFilterFn,
  config: TypeConfig
): any[] => {
  const nodesName = config.nodesName;

  return dataArray
    .filter((item: any) => {
      const itemNodes = item[nodesName];

      if (!itemNodes) {
        const filteredItem = filterFn(item);
        console.log('filtered', filteredItem, item);
        return filteredItem;
      } else {
        return true;
      }
    })
    .map((item: any) => {
      item = Object.assign({}, item);
      const itemNodes = item[nodesName];
      if (Array.isArray(itemNodes)) {
        filterData(itemNodes, filterFn, config);
      }

      // console.log('item', item);
      return item;
    });
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

  // const config = { childrenKeyName: nodesName };
  // const filteredData = arrayTreeFilter(data, filterFn, config);

  const filteredData = filterData(data, filterFn, config);

  console.log('FILTER DATA', filteredData);

  return filteredData || [];
};

export default treeFilter;
