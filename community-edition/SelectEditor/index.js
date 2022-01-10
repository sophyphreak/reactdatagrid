/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import ComboBox from '../packages/ComboBox';
import ScrollContainer from '../packages/react-scroll-container-pro/src';
const stopPropagation = (e) => e.stopPropagation();
const styleWidth100 = { width: '100%' };
const renderListScroller = (props) => {
    return (React.createElement(ScrollContainer, { ...props, applyCSSContainOnScroll: false, viewStyle: styleWidth100, onWheel: stopPropagation }));
};
const SelectEditor = (props) => {
    const { editorProps, rtl } = props;
    const editorPropsStyle = editorProps ? editorProps.style : null;
    return (React.createElement("div", { className: 'InovuaReactDataGrid__cell__editor InovuaReactDataGrid__cell__editor--select' },
        React.createElement(ComboBox, { ...editorProps, collapseOnSelect: true, focusOnClick: false, autoFocus: false, theme: editorProps.theme ? editorProps.theme : props.theme, renderListScroller: props.nativeScroll ? undefined : renderListScroller, defaultValue: props.value, rtl: rtl, onChange: (value) => {
                props.onChange && props.onChange(value);
            }, constrainTo: ".inovua-react-scroll-container__wrapper", style: {
                ...editorPropsStyle,
                minWidth: Math.max(0, props.cellProps.computedWidth - 30),
            }, onBlur: props.onComplete, onItemClick: (item) => {
                const value = item.id;
                props.onChange && props.onChange(value);
                if (props.onComplete) {
                    // give time to value to change, then onComplete it is triggered
                    setTimeout(props.onComplete, 0);
                }
            }, onKeyDown: (e, combo) => {
                const { key } = e;
                if (key === 'Escape') {
                    if (!combo.getExpanded()) {
                        props.onCancel && props.onCancel(e);
                    }
                }
                if (key === 'Enter') {
                    props.onComplete && props.onComplete(e);
                }
                if (key == 'Tab') {
                    e.preventDefault();
                    props.onTabNavigation &&
                        props.onTabNavigation(true, e.shiftKey ? -1 : 1);
                }
            } })));
};
export default SelectEditor;
