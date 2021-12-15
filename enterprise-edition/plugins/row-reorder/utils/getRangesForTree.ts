/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type RangeResultType = {
  top: number;
  bottom: number;
  height: number;
  index: number;
  keyPath: string;
  depth: number;
  parent: boolean;
};

const getRangesForTree = ({
  data,
  initialOffset,
  rowHeightManager,
  initialScrollTop,
}: {
  data: any[];
  initialOffset: number;
  rowHeightManager: any;
  initialScrollTop: number;
}): RangeResultType[] => {
  const ranges: any = data.map((row: any, i: number) => {
    if (!row) {
      return;
    }

    const rowHeight = rowHeightManager.getRowHeight(i);
    const top = rowHeightManager.getRowOffset(i);
    const offset = top + initialOffset - (initialScrollTop || 0);
    const bottom = offset + rowHeight;

    const nodeProps = row.__nodeProps;

    const result = {
      top: offset,
      bottom,
      height: rowHeight,
      index: i,
      keyPath: nodeProps.key,
      depth: nodeProps.depth,
      parent: nodeProps.initialNodes !== undefined,
    };

    return result;
  });

  return ranges;
};

export default getRangesForTree;
