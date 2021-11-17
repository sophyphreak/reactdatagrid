/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRef } from 'react';
const useClipboard = (props, computedProps, computedPropsRef) => {
    const clipboard = useRef(false);
    const preventBlurOnContextMenuOpen = useRef(false);
    const copyActiveRowToClipboard = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (computedProps.computedCellSelection) {
            return;
        }
        const activeRow = computedProps.getActiveItem();
        if (computedProps.onCopyActiveRowChange) {
            computedProps.onCopyActiveRowChange(activeRow);
        }
        if (activeRow && navigator.clipboard) {
            delete activeRow[computedProps.idProperty];
            const parsedActiveRow = JSON.stringify(activeRow);
            navigator.clipboard
                .writeText(parsedActiveRow)
                .then(() => {
                if (Object.keys(activeRow).length > 0) {
                    clipboard.current = true;
                }
            })
                .catch(e => console.warn(e));
        }
    };
    const pasteActiveRowFromClipboard = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (computedProps.computedCellSelection) {
            return;
        }
        if (navigator.clipboard) {
            navigator.clipboard.readText().then(data => {
                const parsedData = JSON.parse(data);
                const activeIndex = computedProps.computedActiveIndex;
                if (computedProps.onPasteActiveRowChange) {
                    computedProps.onPasteActiveRowChange(parsedData);
                }
                if (activeIndex != null) {
                    computedProps.setItemAt(activeIndex, parsedData, {
                        replace: false,
                    });
                }
            });
        }
    };
    const copySelectedCellsToClipboard = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (!computedProps.computedCellSelection) {
            return;
        }
        const selectedCells = computedProps.computedCellSelection;
        const rows = {};
        Object.keys(selectedCells).map((key) => {
            const parsedKey = key.split(',');
            const index = parseInt(parsedKey[0]);
            const column = parsedKey[1];
            const data = computedProps.getData();
            if (index !== undefined && column !== undefined) {
                const cellValue = data[index][column];
                rows[index] = Object.assign({}, rows[index], { [column]: cellValue });
            }
        });
        if (computedProps.onCopySelectedCellsChange) {
            computedProps.onCopySelectedCellsChange(rows);
        }
        if (!!rows && navigator.clipboard) {
            const parsedSelectedCells = JSON.stringify(rows);
            navigator.clipboard
                .writeText(parsedSelectedCells)
                .then(() => {
                if (Object.keys(rows).length > 0) {
                    clipboard.current = true;
                }
            })
                .catch(e => console.warn(e));
        }
    };
    const pasteSelectedCellsFromClipboard = () => {
        const { current: computedProps } = computedPropsRef;
        if (!computedProps) {
            return;
        }
        if (!computedProps.computedCellSelection) {
            return;
        }
        if (navigator.clipboard) {
            navigator.clipboard.readText().then(data => {
                const parsedData = JSON.parse(data);
                const [activeRow, activeColumn] = computedProps.computedActiveCell;
                const dataArray = Object.keys(parsedData).map((key, index) => {
                    const columns = {};
                    Object.keys(parsedData[key]).map((columnKey, i) => {
                        const column = computedProps.getColumnBy(activeColumn + i);
                        if (column) {
                            const id = column.id;
                            const computedColumn = { [id]: parsedData[key][columnKey] };
                            columns[index] = Object.assign({}, columns[index], computedColumn);
                        }
                    });
                    return Object.assign({}, { id: activeRow + index, ...columns[index] });
                });
                if (computedProps.onPasteSelectedCellsChange) {
                    computedProps.onPasteSelectedCellsChange(dataArray);
                }
                computedProps.setItemsAt(dataArray, { replace: false });
            });
        }
    };
    return {
        copyActiveRowToClipboard,
        pasteActiveRowFromClipboard,
        copySelectedCellsToClipboard,
        pasteSelectedCellsFromClipboard,
        clipboard,
        preventBlurOnContextMenuOpen,
    };
};
export { useClipboard };
