/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const onCopyClickHandle = (computedProps) => {
    if (!computedProps) {
        return;
    }
    if (computedProps.computedCellSelection) {
        computedProps.copySelectedCellsToClipboard();
    }
    else {
        computedProps.copyActiveRowToClipboard();
    }
};
const onPasteClickHandle = (computedProps) => {
    if (!computedProps) {
        return;
    }
    if (computedProps.computedCellSelection) {
        computedProps.pasteSelectedCellsFromClipboard();
    }
    else {
        computedProps.pasteActiveRowFromClipboard();
    }
};
const pasteDisableHandle = (computedProps) => {
    let result = true;
    if (computedProps.clipboard && computedProps.clipboard.current) {
        result = false;
    }
    return result;
};
const renderClipboardContextMenu = (menuProps, { computedProps }) => {
    if (!computedProps) {
        return;
    }
    if (!computedProps.enableClipboard) {
        return;
    }
    menuProps.autoDismiss = true;
    menuProps.items = [
        {
            label: 'Copy',
            secondaryLabel: 'Ctrl/Cmd + c',
            onClick: () => onCopyClickHandle(computedProps),
        },
        {
            label: 'Paste',
            secondaryLabel: 'Ctrl/Cmd + v',
            onClick: () => onPasteClickHandle(computedProps),
            disabled: pasteDisableHandle(computedProps),
        },
    ];
};
export default renderClipboardContextMenu;
