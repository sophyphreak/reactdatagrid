/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the Commercial License found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
const ScrollingRegion = forwardRef((props, ref) => {
    const scrollRegionRef = useRef();
    const setVisible = (visible) => {
        if (scrollRegionRef.current) {
            if (visible) {
                scrollRegionRef.current.style.display = 'block';
            }
            else {
                scrollRegionRef.current.style.display = 'none';
            }
        }
    };
    const setHeight = (height) => {
        if (scrollRegionRef.current) {
            scrollRegionRef.current.style.height = `${height}px`;
        }
    };
    useImperativeHandle(ref, () => ({
        setVisible: setVisible,
        setHeight: setHeight,
    }));
    const className = props.DEFAULT_CLASS_NAME;
    return (React.createElement("div", { ref: scrollRegionRef, style: {
            [props.dir === -1 ? 'top' : 'bottom']: 0,
        }, className: className, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave }));
});
ScrollingRegion.defaultProps = {
    DEFAULT_CLASS_NAME: 'InovuaReactDataGrid__row-drag-scrolling-region',
};
export default ScrollingRegion;
