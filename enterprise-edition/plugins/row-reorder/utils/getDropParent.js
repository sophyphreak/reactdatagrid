/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
let dropParent = '';
let dropDepth = 0;
const getDropParent = ({ ranges, dragBoxRegion, }) => {
    const boxTop = dragBoxRegion.top;
    ranges.filter((row) => {
        if (boxTop >= row.top && boxTop <= row.bottom) {
            dropParent = row.keyPath;
            dropDepth = row.depth;
        }
    });
    return { dropParent, dropDepth };
};
export default getDropParent;
