/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import DEFAULT_FILTER_TYPES from './filterTypes';
import { buildTypeOperators, buildFilterParam, validateFilters, } from './filter';
const doFilter = (item, filterValueArray, filterTypes = DEFAULT_FILTER_TYPES, columnsMap) => {
    const typeOperators = buildTypeOperators(filterTypes);
    for (let i = 0, len = filterValueArray.length; i < len; i++) {
        const fv = filterValueArray[i];
        const { type, operator, fn } = fv;
        const currentTypeOperators = typeOperators[type];
        if (validateFilters(fv, filterTypes, currentTypeOperators)) {
            continue;
        }
        const filterParam = buildFilterParam(item, fv, filterTypes, columnsMap);
        const filterFn = fn || currentTypeOperators[operator].fn;
        if (filterFn(filterParam) !== true) {
            return false;
        }
    }
    return true;
};
const filterData = (dataArray, filterFn, config) => {
    const nodesName = config.nodesName;
    return (dataArray
        // the map fn is here only to make sure filtered results
        // are not kept in the initial datasource
        .map(item => {
        return {
            ...item,
        };
    })
        .filter((item) => {
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
    }));
};
const treeFilter = (data, filterValueArray, filterTypes = DEFAULT_FILTER_TYPES, columnsMap, options) => {
    const computedProps = (options && options.props) || {};
    const nodesName = (computedProps && computedProps.nodesProperty) || 'nodes';
    const config = {
        nodesName,
    };
    const filterFn = (item) => {
        const filterItem = doFilter(item, filterValueArray, filterTypes, columnsMap);
        return filterItem;
    };
    return filterData(data, filterFn, config) || [];
};
export default treeFilter;
