/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

let dropGroup: string = '';
let keyPath: string[] = [];

const getDropGroup = ({
  ranges,
  dragBoxRegion,
}: {
  ranges: any[];
  dragBoxRegion: any;
}): { dropGroup: string; keyPath: string[] } => {
  const boxTop = dragBoxRegion.top;
  const boxBottom = dragBoxRegion.bottom;

  ranges.filter((row: any) => {
    if (boxTop + 1 >= row.top && boxBottom <= row.bottom) {
      dropGroup = row.keyPath.join('/');
      keyPath = row.keyPath;
    }
  });

  return { dropGroup, keyPath };
};

export default getDropGroup;
