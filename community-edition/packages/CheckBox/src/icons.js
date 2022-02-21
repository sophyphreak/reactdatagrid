/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
const checkedIcon = ({ style, size = 16, className }) => (React.createElement("svg", { width: size, height: size, style: style, className: className, viewBox: "0 0 16 16" },
    React.createElement("g", { fillRule: "evenodd" },
        React.createElement("rect", { width: size, height: size, stroke: "none", rx: "1" }),
        React.createElement("path", { fill: "none", strokeLinecap: "round", strokeWidth: "2", d: "M3.357 9.018L7.229 12 12.613 5" }))));
const uncheckedIcon = ({ style, size = 16, className }) => (React.createElement("svg", { width: size, height: size, className: className, style: style, viewBox: "0 0 16 16" },
    React.createElement("rect", { width: size - 2, height: size - 2, x: "1", y: "1", fill: "none", fillRule: "evenodd", strokeWidth: "2", rx: "1" })));
const indeterminateIcon = ({ style, size = 16, className }) => (React.createElement("svg", { width: size, height: size, style: style, className: className, viewBox: "0 0 16 16" },
    React.createElement("g", { fillRule: "evenodd" },
        React.createElement("g", null,
            React.createElement("rect", { width: size, height: size, fill: "none", rx: "1" })),
        React.createElement("g", null,
            React.createElement("rect", { width: "10", height: "2", x: "3", y: "7", rx: "1" })))));
export { checkedIcon, uncheckedIcon, indeterminateIcon };
