/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import DEFAULT_FILTER_TYPES from './filterTypes';
import { buildTypeOperators, buildFilterParam, validateFilters, } from './filter';
const EMPTY_OBJECT = {};
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
let newParentNode = EMPTY_OBJECT;
const filterData = (dataArray, config, parentNode, result = [], newDataArray = []) => {
    const nodesName = config.nodesName;
    const filterValueArray = config.filterValueArray;
    const filterTypes = config.filterTypes;
    const columnsMap = config.columnsMap;
    const filterFn = (filterItem) => {
        const filter = doFilter(filterItem, filterValueArray, filterTypes, columnsMap);
        return filter;
    };
    dataArray.forEach((item) => {
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
            }
            else {
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
const treeFilter = (data, filterValueArray, filterTypes = DEFAULT_FILTER_TYPES, columnsMap, options) => {
    const computedProps = options.props || {};
    const nodesName = computedProps.nodesProperty || 'nodes';
    const config = {
        nodesName,
        filterValueArray,
        filterTypes,
        columnsMap,
    };
    const filteredData = filterData(data, config);
    return filteredData || [];
};
export default treeFilter;
