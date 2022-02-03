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
    const computeColumnSizesAuto = (columns, callback) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (!columns.length) {
            return;
        }
        columns.forEach((column) => {
            callback(column);
        });
    };
    const getCellForColumn = (column, row) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        let result;
        const idProperty = computedProps.idProperty;
        const columnId = column[idProperty];
        const cells = row.getCells();
        if (!cells.length) {
            return;
        }
        cells.forEach((cell) => {
            const cellProps = cell.props;
            const cellId = cellProps[idProperty];
            if (columnId === cellId) {
                result = cell.domRef.current;
            }
        });
        return result;
    };
    const getCellsForColumn = (column) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        const result = [];
        if (computedProps.getRows) {
            computedProps.getRows().forEach((rowInstance) => {
                const row = rowInstance.row;
                const cell = getCellForColumn(column, row);
                result.push(cell);
            });
        }
        return result;
    };
    const cloneIntoDummyContainer = (cell, dummyContainer) => {
        const cloneCell = cell.cloneNode(true);
        cloneCell.style.width = '';
        cloneCell.style.position = 'static';
        cloneCell.style.left = '';
        cloneCell.firstChild.style.width = 'fit-content';
        const cloneParent = document.createElement('div');
        cloneParent.appendChild(cloneCell);
        dummyContainer.appendChild(cloneParent);
    };
    const computeOptimizedWidth = (column) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return -1;
        }
        const cells = getCellsForColumn(column);
        if (!cells || !cells.length) {
            return -1;
        }
        const dummyContainer = document.createElement('span');
        dummyContainer.style.position = 'fixed';
        const vl = computedProps.getVirtualList();
        const container = vl.getContainerNode();
        container.appendChild(dummyContainer);
        let snapshotWidth = 0;
        cells.forEach(cell => {
            snapshotWidth = cell.offsetWidth;
            cloneIntoDummyContainer(cell, dummyContainer);
        });
        let dummyContainerWidth = dummyContainer.offsetWidth;
        if (snapshotWidth < dummyContainerWidth) {
            // the border width which is 1px it is added
            dummyContainerWidth += 1;
        }
        container.removeChild(dummyContainer);
        return dummyContainerWidth;
    };
    const normaliseWidth = (column, width) => {
        const minWidth = column.minWidth;
        const maxWidth = column.maxWidth;
        if (minWidth && width < minWidth) {
            width = minWidth;
        }
        if (maxWidth && width > maxWidth) {
            width = maxWidth;
        }
        return width;
    };
    const setColumnSizesToFit = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        checkForAvaibleWidth();
    };
    const setColumnSizesAuto = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        const columns = computedProps.visibleColumns;
        let columnsToSize = [];
        let counter = -1;
        const newColumnSizes = {};
        while (counter !== 0) {
            counter = 0;
            computeColumnSizesAuto(columns, (column) => {
                if (columnsToSize.indexOf(column) >= 0) {
                    return false;
                }
                const optimizedWidth = computeOptimizedWidth(column);
                if (optimizedWidth > 0) {
                    const newWidth = normaliseWidth(column, optimizedWidth);
                    const columnId = column.id;
                    columnsToSize.push(column);
                    Object.assign(newColumnSizes, { [columnId]: newWidth });
                    counter++;
                }
                return true;
            });
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
    return {
        setColumnSizesToFit,
        setColumnSizesAuto,
    };
};
export default useColumnsSizing;
