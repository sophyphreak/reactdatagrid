/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const getRangesForGroups = ({
  data,
  initialOffset,
  rowHeightManager,
  initialScrollTop,
}: {
  data: any[];
  initialOffset: number;
  rowHeightManager: any;
  initialScrollTop: number;
}) => {
  let keyPath: string[];
  let depth: number = 0;
  let value: string = '';

  const ranges: any[] = data.map((row: any, i: number) => {
    if (!row) {
      return;
    }

    const rowHeight = rowHeightManager.getRowHeight(i);
    const top = rowHeightManager.getRowOffset(i);
    const offset = top + initialOffset - (initialScrollTop || 0);
    const bottom = offset + rowHeight;

    if (row.__group) {
      keyPath = row.keyPath;
      depth = row.depth;
      value = row.value;
    }

    const result = {
      group: row.__group || false,
      keyPath,
      leaf: row.leaf || false,
      value,
      depth,
      top: offset,
      bottom: bottom,
      height: rowHeight,
      index: i,
    };

    return result;
  });

  return ranges;
};

export default getRangesForGroups;
