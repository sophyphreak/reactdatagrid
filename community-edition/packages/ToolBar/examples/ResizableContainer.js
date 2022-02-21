/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Panel from '../../Panel';
import '../../Panel/style/index.scss';
export default props => {
    const renderBody = () => {
        return (React.createElement("div", { style: { padding: '0 20px' } },
            React.createElement("p", null, "When we started building the toolkit, we've made a checklist of features that our components need to include out-of-the-box:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Performance"),
                    " - a component is only useful if it does its job quickly. This will generally not be a problem with smaller components like buttons, dialogs, color pickers, etc - but menus, lists and grids need a lot of performance considerations in order to be really snappy."))));
    };
    const width = props.width !== undefined ? props.width : '100%';
    return (React.createElement(Panel, { ...props, style: { maxWidth: width }, bodyStyle: { paddingTop: 30 }, renderTitleBar: () => props.children, renderBody: renderBody, bodyScrollable: true }));
};
