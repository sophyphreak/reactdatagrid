/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const dropIndexValidation = ({
  data,
  count,
  dragIndex,
  dropIndex,
  isRowReorderValid,
  selectedGroup,
  allowRowReoderBetweenGroups,
  computedGroupBy,
  computedTreeEnabled,
}: {
  data: any;
  count: number;
  dragIndex: number;
  dropIndex: number;
  isRowReorderValid: Function;
  selectedGroup: string[];
  allowRowReoderBetweenGroups: boolean;
  computedGroupBy?: string[];
  computedTreeEnabled?: boolean;
}) => {
  let iterateRows = false;
  let validDropPositions = [];

  if (computedGroupBy && computedGroupBy.length > 0) {
    validDropPositions = data.reduce((acc: any, curr: any, i: number) => {
      if (curr.__group) {
        const value = curr.keyPath.join('/');
        if (!value.localeCompare(selectedGroup)) {
          iterateRows = true;
        } else {
          if (!allowRowReoderBetweenGroups) {
            iterateRows = false;
          }
        }
      }

      if (allowRowReoderBetweenGroups) {
        iterateRows = true;
      }

      if (!curr.__group && iterateRows) {
        acc[i] = true;
      } else {
        acc[i] = false;
      }

      return acc;
    }, {});
  } else if (computedTreeEnabled) {
    validDropPositions = data.reduce((acc: any, curr: any, i: number) => {
      const { leafNode } = curr.__nodeProps;
      if (!leafNode) {
        acc[i] = false;
      } else {
        acc[i] = true;
      }

      return acc;
    }, {});
  } else {
    validDropPositions = [...Array(count)].reduce((acc, _curr, i) => {
      acc[i] = true;

      return acc;
    }, {});
    validDropPositions[count] = true;
  }

  if (isRowReorderValid) {
    validDropPositions[dropIndex] = isRowReorderValid({
      dragRowIndex: dragIndex,
      dropRowIndex: dropIndex,
    });
  }

  return validDropPositions;
};

export default dropIndexValidation;
