/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import getScrollbarWidth from '../packages/getScrollbarWidth';
const removeItemFromArray = (array, obj) => {
    const index = array.indexOf(obj);
    if (index >= 0) {
        array.splice(index, 1);
    }
};
const getColumnsWidths = (columns) => {
    return columns.reduce((width, column) => {
        return width + column.computedWidth;
    }, 0);
};
const useColumnsSizing = (_props, _computedProps, computedPropsRef) => {
    const computeColumnSizesToFit = (gridWidth) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        const visibleColumns = computedProps.visibleColumns;
        if (gridWidth <= 0 || !visibleColumns.length) {
            return;
        }
        const columnsToSize = [];
        const columnsNotToSize = [];
        visibleColumns.forEach((column) => {
            if (column.resizable === false) {
                columnsNotToSize.push(column);
            }
            else {
                columnsToSize.push(column);
            }
        });
        const columnsToResize = columnsToSize.slice(0);
        let finished = false;
        const updateColumnsNotToSize = (column) => {
            removeItemFromArray(columnsToResize, column);
            columnsNotToSize.push(column);
        };
        const newColumnSizes = {};
        while (!finished) {
            finished = true;
            const availableSpace = gridWidth - getColumnsWidths(columnsNotToSize);
            const scale = availableSpace / getColumnsWidths(columnsToResize);
            let spaceForLastColumn = availableSpace;
            for (let i = columnsToResize.length - 1; i >= 0; i--) {
                const column = columnsToResize[i];
                const minWidth = column.computedMinWidth;
                const maxWidth = column.computedMaxWidth;
                let newWidth = Math.round(column.computedWidth * scale);
                if (minWidth && newWidth < minWidth) {
                    newWidth = minWidth;
                    updateColumnsNotToSize(column);
                    finished = false;
                }
                else if (maxWidth && newWidth > maxWidth) {
                    newWidth = maxWidth;
                    updateColumnsNotToSize(column);
                    finished = false;
                }
                else if (i === 0) {
                    newWidth = spaceForLastColumn;
                }
                const columnId = column.id;
                Object.assign(newColumnSizes, { [columnId]: newWidth });
                spaceForLastColumn -= newWidth;
            }
        }
        if (computedProps.virtualizeColumns) {
            const bodyRef = computedProps.bodyRef.current;
            const columnLayout = bodyRef.columnLayout;
            const headerLayout = columnLayout.headerLayout;
            const header = headerLayout.header;
            setTimeout(() => {
                header.updateColumns();
            }, 10);
        }
        let newReservedViewportWidth = computedProps.reservedViewportWidth;
        const columnFlexes = computedProps.columnFlexes;
        computedProps.computeColumnSizes(newColumnSizes || {}, columnFlexes || {}, newReservedViewportWidth, {
            getColumnBy: computedProps.getColumnBy,
            onColumnResize: computedProps.initialProps.onColumnResize,
            onBatchColumnResize: computedProps.initialProps.onBatchColumnResize,
            columnSizes: computedProps.columnSizes,
            setColumnSizes: computedProps.setColumnSizes,
            setColumnFlexes: computedProps.setColumnFlexes,
        });
    };
    const checkForAvaibleWidth = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        const scrollbars = computedProps.scrollbars;
        const hasVerticalScrollbar = scrollbars.vertical;
        const scrollbarWidth = hasVerticalScrollbar ? getScrollbarWidth() : 0;
        const computedAvailableWidth = computedProps.availableWidth || 0;
        const availableWidth = computedAvailableWidth - scrollbarWidth;
        if (availableWidth > 0) {
            computeColumnSizesToFit(availableWidth);
        }
    };
    const setColumnSizesToFit = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        checkForAvaibleWidth();
    };
    return {
        setColumnSizesToFit,
    };
};
export default useColumnsSizing;
