/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
const propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    onTouchStart: PropTypes.func.isRequired,
    resizeHandleClassName: PropTypes.string.isRequired,
};
export default class ColumnResizer extends Component {
    domRef;
    overHeight = 0;
    static propTypes = propTypes;
    constructor(props) {
        super(props);
        this.state = {
            over: false,
        };
        this.domRef = React.createRef();
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.setOver = throttle(this.setOver, 50, { leading: false });
    }
    onMouseEnter() {
        const parent = this.domRef.current.parentElement;
        // const filterWrapper = parent
        //   ? parent.querySelector(
        //       '.InovuaReactDataGrid__column-header__filter-wrapper'
        //     )
        //   : null;
        // const overHeight = filterWrapper
        //   ? parent.offsetHeight - filterWrapper.offsetHeight
        //   : null;
        const overHeight = parent ? parent.offsetHeight : null;
        this.overHeight = overHeight;
        this.setOver(true);
    }
    setOver(value) {
        if (value) {
            this.setState({
                over: true,
                overHeight: this.overHeight,
            });
        }
        else {
            this.setState({
                over: false,
            });
        }
    }
    onMouseLeave() {
        this.setOver(false);
    }
    onMouseDown(event) {
        event.preventDefault();
        if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
        }
        this.setState({
            over: false,
        });
    }
    onTouchStart(event) {
        event.preventDefault();
        if (this.props.onTouchStart) {
            this.props.onTouchStart(event);
        }
        this.setState({
            over: false,
        });
    }
    render() {
        const { props } = this;
        const { className, resizeHandleClassName, } = this.props;
        let style = {
            ...props.style,
            height: this.state.overHeight,
        };
        const resizeHandleStyle = {
            ...props.resizeHandleStyle,
        };
        if (this.state.over) {
            resizeHandleStyle.visibility = 'visible';
        }
        else {
            resizeHandleStyle.visibility = 'hidden';
        }
        return (React.createElement("div", { ref: this.domRef, draggable: "false", className: className, onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, style: style },
            React.createElement("div", { style: resizeHandleStyle, className: resizeHandleClassName })));
    }
}
