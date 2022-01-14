/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

let dropParent: string = '';
let dropDepth: number = 0;

const getDropParent = ({
  ranges,
  dragBoxRegion,
}: {
  ranges: any[];
  dragBoxRegion: any;
}): { dropParent: string; dropDepth: number } => {
  const boxTop = dragBoxRegion.top;

  ranges.filter((row: any) => {
    if (boxTop >= row.top && boxTop <= row.bottom) {
      dropParent = row.keyPath;
      dropDepth = row.depth;
    }
  });

  return { dropParent, dropDepth };
};

export default getDropParent;
