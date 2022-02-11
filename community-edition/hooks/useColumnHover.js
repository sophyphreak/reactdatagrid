/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState } from 'react';
const useColumnHover = (_props, _computedProps, computedPropsRef) => {
    const [columnIndexHovered, setColumnIndexHovered] = useState(-1);
    const onColumnMouseEnter = (cellProps) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (computedProps.computedEnableColumnHover ||
            cellProps.computedEnableColumnHover) {
            const columnIndex = cellProps.columnIndex;
            if (columnIndex != null) {
                setColumnIndexHovered(columnIndex);
            }
        }
    };
    const onColumnMouseLeave = (cellProps) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (computedProps.computedEnableColumnHover ||
            cellProps.computedEnableColumnHover) {
            setColumnIndexHovered(-1);
        }
    };
    return {
        columnIndexHovered,
        onColumnMouseEnter,
        onColumnMouseLeave,
    };
};
export default useColumnHover;
