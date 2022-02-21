/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Button from '../../Button';
import '../../Button/style/index.scss';
import ComboBox from '../../ComboBox';
import '../../ComboBox/style/index.scss';
import DropDownButton from '../../DropdownButton';
import '../../DropdownButton/style/index.scss';
import SplitButton from '../../SplitButton';
import '../../SplitButton/style/index.scss';
import { SETTINGS_ICON, EDIT_ICON, DELETE_ICON, REFRESH_ICON, BACK_ICON, SAVE_ICON, FORWARD_ICON, ZOOM_BACK, UNDO_ICON, REDO_ICON, MAIL_ICON, } from './icons';
const settingsItems = [
    { label: 'Refresh', icon: REFRESH_ICON },
    { label: 'Back', icon: BACK_ICON },
    '-',
    {
        label: 'Save file as',
        icon: SAVE_ICON,
        items: [
            { label: 'PDF' },
            { label: 'HTML' },
            { label: 'PNG' },
            { label: 'Animated GIF' },
        ],
    },
    { label: 'Open' },
    {
        label: 'Export sheet to',
        items: [{ label: 'CSV' }, { label: 'Proprietary format' }],
    },
];
const menuItems = [
    { label: 'Back', secondaryLabel: 'Alt+Left Arrow', icon: BACK_ICON },
    {
        label: 'Forward',
        disabled: true,
        secondaryLabel: 'Alt+Right Arrow',
        icon: FORWARD_ICON,
    },
    {
        label: 'Reload',
        secondaryLabel: 'Ctrl + R',
        icon: REFRESH_ICON,
    },
    '-',
    { label: 'Save as...', secondaryLabel: 'Ctrl + S', icon: SAVE_ICON },
    { label: 'Print...', secondaryLabel: 'Ctrl + P' },
    { label: 'Cast...' },
    {
        label: 'Translate to',
        items: [
            { label: 'English', name: 'en' },
            { label: 'French', name: 'fr' },
            { label: 'German', name: 'de' },
        ],
    },
    {
        label: 'Translate to Disabled',
        disabled: true,
        items: [
            { label: 'English', name: 'en' },
            { label: 'French', name: 'fr' },
            { label: 'German', name: 'de' },
        ],
    },
    '-',
    { label: 'View page source', secondaryLabel: 'Ctrl + U' },
    { label: 'Inspect', secondaryLabel: 'Ctrl + Shift + I', icon: ZOOM_BACK },
];
const separatorStyle = {
    width: 1,
    margin: '6px 4px',
    background: '#a1b6d3',
};
const separator = React.createElement("div", { style: separatorStyle });
const newButton = React.createElement(Button, { style: { minWidth: 90 } }, "New item");
const iconButton = (React.createElement(Button, { style: { minWidth: 90 }, icon: EDIT_ICON, style: { minWidth: 30 } }));
const deleteButton = (React.createElement(Button, { style: { minWidth: 90 }, icon: DELETE_ICON }, "Delete"));
const settingsButton = (React.createElement(DropDownButton, { items: settingsItems, style: { maxHeight: 32 } },
    React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
        SETTINGS_ICON,
        " ",
        React.createElement("span", { style: { marginLeft: 5 } }, "Settings"))));
const menuButton = React.createElement(SplitButton, { items: menuItems }, "Menu");
const undoButton = (React.createElement(Button, { style: { minWidth: 90 }, icon: UNDO_ICON }, "Undo"));
const redoButton = (React.createElement(Button, { style: { minWidth: 90 }, icon: REDO_ICON }, "Redo"));
const mailButton = (React.createElement(Button, { style: { minWidth: 90 }, icon: MAIL_ICON }, "E-mail"));
const combo = (React.createElement(ComboBox, { style: { width: 300 }, collapseOnSelect: true, onChange: value => this.setState({
        value,
    }), dataSource: [
        { id: 1, label: 'romania' },
        { id: 2, label: 'Italy' },
    ] }));
export { newButton, iconButton, deleteButton, settingsButton, menuButton, undoButton, redoButton, mailButton, separator, combo, };
