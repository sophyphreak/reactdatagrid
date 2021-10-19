/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component, createRef } from 'react';
import join from '@inovua/reactdatagrid-community/packages/join';
class DragRowArrow extends Component {
    dragRowArrowRef;
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            offset: 0,
            top: 0,
            left: 0,
            height: 0,
            isValid: true,
        };
        this.dragRowArrowRef = createRef();
    }
    setTop = (top) => {
        if (this.dragRowArrowRef && this.dragRowArrowRef.current) {
            this.dragRowArrowRef.current.style.top = `${top + this.state.offset}px`;
        }
    };
    setHeight = (height) => {
        if (height !== this.state.height) {
            this.setState({ height });
        }
    };
    setLeft = (left) => {
        if (left !== this.state.left) {
            this.setState({ left });
        }
    };
    setOffset = (offset) => {
        this.setState({ offset });
    };
    setVisible = (visible) => {
        if (visible !== this.state.visible) {
            this.setState({ visible });
        }
    };
    setValid = (isValid) => {
        if (isValid !== this.state.isValid) {
            this.setState({ isValid });
        }
    };
    render = () => {
        const className = join('InovuaReactDataGrid__row-reorder-arrow', this.state.isValid
            ? 'InovuaReactDataGrid__row-reorder-arrow--valid'
            : 'InovuaReactDataGrid__row-reorder-arrow--invalid');
        const style = Object.assign({
            left: this.state.left,
            opacity: this.state.visible ? 1 : 0,
        }, this.props.rowReorderArrowStyle);
        return (React.createElement("div", { ref: this.dragRowArrowRef, className: className, style: style }));
    };
}
export default DragRowArrow;
