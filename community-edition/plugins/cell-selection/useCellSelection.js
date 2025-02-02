/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useMemo, useState, useCallback, useRef, } from 'react';
import useProperty from '@inovua/reactdatagrid-community/hooks/useProperty';
import batchUpdate from '@inovua/reactdatagrid-community/utils/batchUpdate';
import clamp from '@inovua/reactdatagrid-community/utils/clamp';
import useActiveCell from './useActiveCell';
const getFirstSelectedCell = (cellSelection) => {
    return cellSelection.sort((cell1, cell2) => {
        if (cell1[0] < cell2[0]) {
            return -1;
        }
        else if (cell1[0] > cell2[0]) {
            return 1;
        }
        return cell1[1] < cell2[1] ? -1 : 1;
    })[0];
};
export const useCellSelection = (props, { rowSelectionEnabled, hasRowNavigation, listenOnCellEnter, }, computedPropsRef) => {
    const [cellSelection, setCellSelection] = useProperty(props, 'cellSelection');
    let { computedActiveCell, getCellSelectionIdKey, getCellSelectionBetween, setActiveCell, getCellSelectionKey, incrementActiveCell, } = useActiveCell(props, computedPropsRef);
    const cellSelectionEnabled = !rowSelectionEnabled ? !!cellSelection : false;
    if (rowSelectionEnabled || hasRowNavigation) {
        computedActiveCell = undefined;
    }
    let cellNavigationEnabled = computedActiveCell !== undefined;
    if (cellSelection) {
        cellNavigationEnabled =
            props.enableKeyboardNavigation !== false && !hasRowNavigation
                ? true
                : computedActiveCell !== undefined || !!cellSelection;
    }
    if (props.enableKeyboardNavigation === false) {
        cellNavigationEnabled = false;
    }
    const cellMultiSelectionEnabledRef = useRef(false);
    cellMultiSelectionEnabledRef.current =
        cellSelectionEnabled && props.multiSelect !== false;
    const cellMultiSelectionEnabled = cellMultiSelectionEnabledRef.current;
    const onCellEnter = useMemo(() => listenOnCellEnter
        ? (event, { columnIndex, rowIndex }) => {
            const { current: computedProps } = computedPropsRef;
            if (!computedProps) {
                return;
            }
            const data = computedProps.getItemAt(rowIndex);
            if (!data || data.__group) {
                return;
            }
            const col = computedProps.getColumnBy(columnIndex);
            if (col && col.cellSelectable === false) {
                return;
            }
            const groupBy = computedProps.computedGroupBy;
            const minCol = groupBy ? groupBy.length : 0;
            if (columnIndex < minCol) {
                return;
            }
            const range = computedProps.getCellSelectionBetween(computedProps.selectionFixedCell ||
                computedProps.computedActiveCell ||
                computedProps.lastSelectedCell, [rowIndex, columnIndex]);
            const queue = batchUpdate();
            queue(() => {
                computedProps.setCellSelection(range);
                computedProps.setLastCellInRange(Object.keys(range).pop() || '');
            });
            const direction = computedProps.cellDragStartRowIndex != null
                ? rowIndex - computedProps.cellDragStartRowIndex
                : rowIndex;
            const sign = direction < 0 ? -1 : direction > 0 ? 1 : 0;
            const scrollToRowIndex = clamp(rowIndex + sign, 0, computedProps.count - 1);
            let visible = computedProps.isCellVisible({
                columnIndex,
                rowIndex: scrollToRowIndex,
            });
            if (visible !== true) {
                visible = visible;
                const left = visible.leftDiff < 0;
                const top = visible.topDiff < 0;
                computedProps.scrollToCell({ columnIndex, rowIndex: scrollToRowIndex }, {
                    top,
                    left,
                });
            }
            queue.commit();
        }
        : null, [listenOnCellEnter]);
    const getContinuousSelectedRangeFor = (selectionMap, cell) => {
        if (!cell) {
            return [];
        }
        selectionMap = selectionMap || {};
        let [row, col] = cell;
        let key = getCellSelectionKey(row, col);
        const range = [];
        while (selectionMap[key]) {
            range.push([row, col]);
            key = getCellSelectionKey(row - 1, col - 1);
            if (selectionMap[key]) {
                row -= 1;
                col -= 1;
                continue;
            }
            if (!selectionMap[key]) {
                key = getCellSelectionKey(row - 1, col);
            }
            if (selectionMap[key]) {
                row -= 1;
                continue;
            }
            if (!selectionMap[key]) {
                key = getCellSelectionKey(row, col - 1);
                col -= 1;
            }
        }
        return range;
    };
    const toggleActiveCellSelection = useCallback((fakeEvent) => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        const computedActiveCell = computedProps.computedActiveCell;
        if (!computedActiveCell) {
            return;
        }
        const [rowIndex, columnIndex] = computedActiveCell;
        const column = computedProps.getColumnBy(columnIndex);
        if (column && column.cellSelectable === false) {
            return;
        }
        const selected = isCellSelected(rowIndex, columnIndex);
        const event = fakeEvent || { ctrlKey: selected };
        computedProps.onCellClickAction(event, { rowIndex, columnIndex });
    }, []);
    const isCellSelected = useCallback((row, col) => {
        if (row && typeof row === 'object') {
            col = row.columnIndex;
            row = row.rowIndex;
        }
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (computedProps.computedCellSelection) {
            const key = computedProps.getCellSelectionKey(row, col);
            return !!computedProps.computedCellSelection[key];
        }
        return false;
    }, []);
    const [cellDragStartRowIndex, setCellDragStartRowIndex] = useState(null);
    const cellSelectionRef = useRef(cellSelection);
    cellSelectionRef.current = cellSelection;
    const onCellSelectionDraggerMouseDown = useMemo(() => {
        if (cellMultiSelectionEnabled && cellSelectionRef.current) {
            let onCellSelectionDraggerMouseDown = (event, { columnIndex, rowIndex }, selectionFixedCell) => {
                const { current: computedProps } = computedPropsRef;
                if (!computedProps) {
                    return;
                }
                const column = computedProps.getColumnBy(columnIndex);
                if (column && column.cellSelectable === false) {
                    return;
                }
                if (!selectionFixedCell) {
                    const currentCell = [rowIndex, columnIndex];
                    const groupBy = computedProps.computedGroupBy;
                    const hasGroupBy = groupBy && groupBy.length;
                    const currentRange = !hasGroupBy
                        ? getContinuousSelectedRangeFor(computedProps.computedCellSelection, currentCell)
                        : [];
                    selectionFixedCell = !hasGroupBy
                        ? getFirstSelectedCell(currentRange.length
                            ? currentRange
                            : [currentCell])
                        : // since in groupBy we are not guaranteed to have continous rows, for how
                            // we leave the activeCell as the selection topmost cell
                            computedProps.computedActiveCell ||
                                computedProps.lastSelectedCell;
                }
                // this.update({
                //   selectionFixedCell,
                //   listenOnCellEnter: true,
                //   cellDragStartRowIndex: rowIndex,
                // });
                const fn = () => {
                    computedProps.setListenOnCellEnter(false, fn);
                    setCellDragStartRowIndex(null);
                    computedProps.setSelectionFixedCell(null);
                };
                const queue = batchUpdate();
                queue(() => {
                    setCellDragStartRowIndex(rowIndex);
                    if (selectionFixedCell === undefined) {
                        selectionFixedCell = null;
                    }
                    computedProps.setSelectionFixedCell(selectionFixedCell);
                    computedProps.setListenOnCellEnter(true, fn);
                });
                queue.commit();
            };
            return onCellSelectionDraggerMouseDown;
        }
        return null;
    }, []);
    return {
        onCellEnter,
        toggleActiveCellSelection,
        cellDragStartRowIndex,
        setCellDragStartRowIndex,
        onCellSelectionDraggerMouseDown,
        // getContinuousSelectedRangeFor,
        getCellSelectionBetween,
        computedActiveCell,
        incrementActiveCell,
        getCellSelectionIdKey,
        setActiveCell,
        getCellSelectionKey,
        cellSelectionEnabled,
        cellNavigationEnabled,
        cellMultiSelectionEnabled,
        computedCellSelection: cellSelection,
        setCellSelection,
    };
};
