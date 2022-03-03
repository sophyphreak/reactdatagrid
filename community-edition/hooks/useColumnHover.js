/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState, useCallback } from 'react';
import join from '../packages/join';
const useColumnHover = (_props, _computedProps, computedPropsRef) => {
    const [columnIndexHovered, setColumnIndexHovered] = useState(-1);
    const computedColumnHoverClassName = (className, columnIndex) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        const { computedEnableColumnHover, columnHoverClassName } = computedProps;
        computedEnableColumnHover && columnIndex === columnIndexHovered
            ? columnHoverClassName
                ? join(`${className}--over`, columnHoverClassName)
                : `${className}--over`
            : '';
    };
    const onColumnMouseEnter = useCallback((cellProps) => {
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
    }, []);
    const onColumnMouseLeave = useCallback((cellProps) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (computedProps.computedEnableColumnHover ||
            cellProps.computedEnableColumnHover) {
            setColumnIndexHovered(-1);
        }
    }, []);
    return {
        columnIndexHovered,
        onColumnMouseEnter,
        onColumnMouseLeave,
        computedColumnHoverClassName,
    };
};
export default useColumnHover;
