/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const getRangesForTree = ({ data, initialOffset, rowHeightManager, initialScrollTop, }) => {
    const ranges = data.map((row, i) => {
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
