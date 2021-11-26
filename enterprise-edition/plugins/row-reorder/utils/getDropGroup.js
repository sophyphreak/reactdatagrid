/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
let dropGroup = '';
let keyPath = [];
const getDropGroup = ({ ranges, dragBoxRegion, }) => {
    const boxTop = dragBoxRegion.top;
    const boxBottom = dragBoxRegion.bottom;
    ranges.filter((row) => {
        if (boxTop + 1 >= row.top && boxBottom <= row.bottom) {
            dropGroup = row.keyPath.join('/');
            keyPath = row.keyPath;
        }
    });
    return { dropGroup, keyPath };
};
export default getDropGroup;
